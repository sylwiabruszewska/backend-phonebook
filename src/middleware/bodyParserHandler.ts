import express from "express";
import { Express } from "express";

export const bodyParserHandler = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
