import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.Routes.js";
import postRouter from "./routes/posts.Routes.js";
import followerRouter from "./routes/followers.Routes.js";
import likeRouter from "./routes/likes.Routes.js";
import commentRouter from "./routes/comments.Routes.js";
import folderRouter from "./routes/folder.Routes.js";
import savedRouter from "./routes/saved.Routes.js";
import notificationsRouter from "./routes/notification.Routes.js";
// router declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/follower", followerRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/saved", savedRouter);
app.use("/api/v1/notifications", notificationsRouter);

export { app };
