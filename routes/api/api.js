import express from "express";
import { contactsRouter } from "./contacts.js";
import { usersRouter } from "./users.js";

const apiRouter = express.Router();

apiRouter.use("/contacts", contactsRouter);
apiRouter.use("/users", usersRouter);

export { apiRouter };
