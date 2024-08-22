import { app } from "@/app";
import { connectToMongoDB } from "@/db/mongoDB";

export const startServer = async () => {
  const PORT = process.env.PORT || 3000;

  await connectToMongoDB();

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}.`);
  });
};

startServer();
