import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/users", async (req, res) => {
  const todos = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(todos);
});

app.post("/users", async (req, res) => {
  const { username, email, password, createdAt } = req.body;
  const todo = await prisma.user.create({
    data: {
      username,
      email,
      password,
      createdAt,
    },
  });

  return res.json(todo);
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.user.findUnique({
    where: { id },
  });

  return res.json(todo);
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /todos
    GET, PUT, DELETE /todos/:id
  </pre>
  `.trim()
  );
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
