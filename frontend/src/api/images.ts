import api from "./client";
import type { ImageMeta } from "../types/ImageMeta";

export const getImages = () => api<ImageMeta[]>("/images");
export const getImage = (id: string) => api<ImageMeta>(`/images/${id}`);