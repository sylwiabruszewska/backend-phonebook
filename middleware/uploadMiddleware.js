import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { setupFolder } from "#helpers/index.js";

const tempDir = path.join(process.cwd(), "temp");
const storageImage = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${file.originalname}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

export const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

setupFolder(tempDir);
setupFolder(storageImage);
