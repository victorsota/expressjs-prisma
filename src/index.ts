import { PrismaClient } from "@prisma/client";
import express from "express";
import rootRouter from "./routes";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use("/api", rootRouter);

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
