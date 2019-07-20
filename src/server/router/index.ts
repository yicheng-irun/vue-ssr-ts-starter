import express from 'express';
import { GraphQLError } from 'graphql';
import expressGraphql from 'express-graphql';
import { Request, Response } from '../types/express';
import apiRouter from '../apis/index';
import settings from '../configs/settings';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.ssrRender('index', {
        title: 'VUE SSR TS STARTER'
    });
});

router.get('/error', (req: Request, res: Response) => {
    throw new Error(`哎呀您好像在找一个错误，那我就顺手给你抛出一个错误吧！`)
});

router.use('/api', apiRouter);

export default router;
