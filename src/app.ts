import express, { Application, Request, Response, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";

import { moduleRoutes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

export const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1", moduleRoutes);

app.use(globalErrorHandler);

app.use(notFound);
