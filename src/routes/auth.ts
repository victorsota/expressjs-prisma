import { Router } from "express";
import { signup, login } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", signup);
authRoutes.get("/login", login);

export default authRoutes;
