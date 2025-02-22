import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://yashchoudhary88505:lgNdLW1NjyEMyjSq@cluster0.ykn88.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err);
    }
};

export default connect;
