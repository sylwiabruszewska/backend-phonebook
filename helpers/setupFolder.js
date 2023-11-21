import { promises as fs } from "fs";

const isAccessible = (folderPath) =>
  fs
    .access(folderPath)
    .then(() => true)
    .catch(() => false);

export const setupFolder = async (folderPath) => {
  const folderAvailable = await isAccessible(folderPath);
  if (!folderAvailable) {
    try {
      await fs.mkdir(folderPath, { recursive: true });
    } catch {
      console.log("no permission");
      process.exit(1);
    }
  }
};
