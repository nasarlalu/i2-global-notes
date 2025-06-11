import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGOURI);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to the database");
        return;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to the database");
    }
};