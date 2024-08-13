import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import AuthRouter from "./routes/AuthRoutes.js";
import ResepRouter from "./routes/ResepRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import CommentRouter from "./routes/CommentRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// route
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/", ResepRouter);
app.use("/api/v1/", UserRouter);
app.use("/api/v1/", CommentRouter);

// connect db
ConnectDB();

// port
const port = process.env.PORT;

// server
app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
