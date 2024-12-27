import express from "express";

const router = express.Router();

router.get("/admin", (req, res));
router.put("/admin/products/:id/edit", (req, res));
router.get("/admin/orders", (req, res));
router.get("/admin/analytics", (req, res));
