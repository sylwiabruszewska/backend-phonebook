import fs from "fs/promises";

import User from "#models/user.js";
import { cropAndResize } from "#helpers/index.js";

export const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { filename, path: tempPath } = req.file;
    await cropAndResize(tempPath);
    const newPath = `public/avatars/${filename}`;
    await fs.rename(tempPath, newPath);

    const avatarURL = `/avatars/${filename}`;

    const user = await User.findById(id);
    await User.findByIdAndUpdate(user._id, { avatarURL });

    return res.status(200).json({
      status: "Success",
      code: 200,
      data: { avatarURL },
    });
  } catch (error) {
    next(error);
  }
};
