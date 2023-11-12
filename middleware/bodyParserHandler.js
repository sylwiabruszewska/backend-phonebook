import express from "express";

export const bodyParserHandler = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
