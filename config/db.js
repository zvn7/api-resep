import mongoose from "mongoose";

const ConnectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
	}
};

export default ConnectDB;