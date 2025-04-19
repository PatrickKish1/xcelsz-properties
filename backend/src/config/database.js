import { connect } from 'mysql2';

const connectDB = async () => {
    try {
        await connect(process.env.MYSQL_HOST);
        console.log('mysql connected successfully');
    } catch (error) {
        console.error('mysql connection error:', error);
        process.exit(1);
    }
};

export default connectDB;