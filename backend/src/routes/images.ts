import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/images
router.get("/", async (_req, res) => {
  const images = await prisma.image.findMany();
  res.json(images);
});

// GET /api/images/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const image = await prisma.image.findUnique({
    where: { id },
  });

  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }

  res.json(image);
});

export default router;
