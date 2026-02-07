import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { isAuthenticated } from "./middlewares/auth-middleware.js";

const app = express();
const port = 3001;
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);
// app.all("/api/auth/*", toNodeHandler(auth)); // For ExpressJS v4
app.all("/api/auth/*splat", toNodeHandler(auth)); //For ExpressJS v5

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/test/auth", isAuthenticated, (req, res) => {
  console.log("The Req has Reached the route endpoint");
  console.log(req.user);
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
