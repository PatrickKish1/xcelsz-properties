// Description: Middleware to upload images to Supabase storage.
import multer from 'multer';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const bucketName = process.env.BUCKET_NAME;
const supabase = createClient(supabaseUrl, supabaseKey);

const storage = multer.memoryStorage();

const uploadToSupabase = async (file) => {
    const fileExt = path.extname(file.originalname);
    const filePath = `${uuid()}/${Date.now()}${fileExt}`;
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.mimetype
        });

    if (error) {
        throw new Error(`Failed to upload file to Supabase: ${error.message}`);
    }
    const { data: { publicUrl } } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return publicUrl;
};

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Only .jpeg, .jpg, .png files are allowed');
        }
    },
    limits: { fileSize: 1024 * 1024 * 10 } // 10MB file size limit
}).array('images', 5); // Allow up to 5 images

const uploadMultiple = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const imagePaths = [];

            for (const file of req.files) {
                try {
                    const publicUrl = await uploadToSupabase(file);
                    imagePaths.push(publicUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    return res.status(500).json({
                        message: `Failed to upload ${file.originalname}: ${error.message}`
                    });
                }
            }
            req.body.images = imagePaths;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default uploadMultiple;