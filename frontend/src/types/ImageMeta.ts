export interface ImageMeta {
  id: string;       // cuid
  name: string;     // filename or human-readable name
  url: string;      // served asset URL
  width: number;    // natural width
  height: number;   // natural height
}