import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("Bağlantı kurulmuş");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/muzivk`);
}

export default connectDB;
