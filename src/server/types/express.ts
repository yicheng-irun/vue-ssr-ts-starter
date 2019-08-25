import { Request, Response, NextFunction, Handler } from 'express';

export interface Request extends Request {
    session: {};
}

export interface Response extends Response {
    ssrRender: (pagePath: string, params: {}) => void;
    ssrHandler: (params: {}) => void;
}

export interface NextFunction extends NextFunction {}

export interface Handler extends Handler {}
