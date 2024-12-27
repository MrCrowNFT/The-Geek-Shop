import express, { Router } from "express"

const router = express.Router();

router.get("/", (req, res));
router.get("/products", (req, res));
router.get("products/search", (req, res));
router.get("/products/:id", (req, res));
router.get("/checkout", (req, res));
router.post("/checkout", (req, res));
