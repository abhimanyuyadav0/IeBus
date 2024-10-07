import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set('debug', false);
mongoose.set('strictQuery', false);

const connectDB = async (): Promise<void> => {
    try {
        // Determine the connection string based on the NODE_ENV variable
        let connectionString: string;

        if (process.env.NODE_ENV === 'production') {
            connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/IeBus';
        } else if (process.env.NODE_ENV === 'staging') {
            connectionString = process.env.MONGO_URI_STAGING || 'mongodb://127.0.0.1:27017/IeBusStaging';
        } else {
            connectionString = process.env.MONGO_URI_DEVELOPMENT || 'mongodb://127.0.0.1:27017/IeBusDevelopment';
        }

        console.log(`Connecting to MongoDB at: ${connectionString}`); // Log the connection string being used

        const conn = await mongoose.connect(connectionString);

        const dbName = connectionString.split('/').pop()?.split('?')[0]; // Extract database name
        console.log(`MongoDB Connected to Database: ${dbName}`);
        console.log(`MongoDB Connected with: ${conn.connection.db.namespace}`);
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
