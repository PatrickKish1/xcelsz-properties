import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const bucketName = process.env.BUCKET_NAME;
const supabase = createClient(supabaseUrl, supabaseKey);

export const deleteFromSupabase = async (files) => {
    const filePaths = files.map(url => {
        try {
            const urlObj = new URL(url);
            const prefix = `/storage/v1/object/public/${bucketName}/`;
            if (urlObj.pathname.startsWith(prefix)) {
                return urlObj.pathname.slice(prefix.length);
            }
            return null;
        } catch (err) {
            return null;
        }
    }).filter(Boolean);

    const { error } = await supabase.storage
        .from(bucketName)
        .remove(filePaths);

    if (error) {
        throw new Error(`Failed to delete file from Supabase: ${error.message}`);
    }
};