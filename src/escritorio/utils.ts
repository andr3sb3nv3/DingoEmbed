/**
 * Dynamically transforms Cloudinary URLs to request optimized delivery formats (like WebP/AVIF),
 * intelligent compression quality, and custom dimensions to drastically improve page speed.
 */
export function optimizeCloudinaryUrl(url: string, width?: number): string {
  if (!url || !url.includes("res.cloudinary.com") || url.includes("f_auto")) {
    return url;
  }
  const parts = url.split("/upload/");
  if (parts.length === 2) {
    const transform = width ? `f_auto,q_auto,w_${width}/` : "f_auto,q_auto/";
    return `${parts[0]}/upload/${transform}${parts[1]}`;
  }
  return url;
}
