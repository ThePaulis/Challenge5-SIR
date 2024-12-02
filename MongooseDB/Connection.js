import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const MongoDB = process.env.MONGODB_URI;

async function Connection() {
    try {
        await mongoose.connect(MongoDB);

    } catch (error) {
        console.error("Failed to connect", error);
    }
}

export default Connection;
