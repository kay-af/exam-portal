import { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRouter } from './authRouter';
import { apiRouter } from './apiRouter';
import cookieParser from 'cookie-parser';
import config from '../../config.json';

const appRouter = Router()

appRouter.use(cors({
    origin: config.clientOrigin,
    credentials: true
}));

appRouter.use(bodyParser.json());
appRouter.use(cookieParser());

appRouter.use('/auth', authRouter);
appRouter.use('/api', apiRouter);

export { appRouter };