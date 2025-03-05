import express, { Application, Request, Response, urlencoded } from "express";

import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/admin/admin.routes";
import { moduleRoutes } from "./app/routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

export const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1", moduleRoutes);

app.use(globalErrorHandler);

app.use(notFound);
