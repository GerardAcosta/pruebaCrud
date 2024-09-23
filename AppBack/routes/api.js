import { Router } from "express";
import { songsRouter } from "./api/songs.js";
import { usersRouter } from "./api/users.js";
import { checkToken } from "../middlewares.js";

export const apiRouter = Router();

apiRouter.use('/songs', checkToken, songsRouter);
apiRouter.use('/users', usersRouter);