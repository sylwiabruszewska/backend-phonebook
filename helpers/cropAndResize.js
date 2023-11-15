import jimp from "jimp";

export const cropAndResize = async (tempPath) => {
  try {
    const image = await jimp.read(tempPath);
    await image.cover(250, 250).autocrop().writeAsync(tempPath);
  } catch (error) {
    console.error(error);
    throw new Error("Error occurred during image processing.");
  }
};
