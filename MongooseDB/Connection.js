import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const MongoDB = "mongodb+srv://joaopaulosilva:Jpos2002@cluster0.vrhc1wu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function Connection() {
    try {
        await mongoose.connect(MongoDB);

    } catch (error) {
        console.error("Failed to connect", error);
    }
}

export default Connection;
