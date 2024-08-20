import express from "express";
import { contactsRouter } from "./contacts";
import { usersRouter } from "./users";

const apiRouter = express.Router();

apiRouter.use("/contacts", contactsRouter);
apiRouter.use("/users", usersRouter);

export { apiRouter };
