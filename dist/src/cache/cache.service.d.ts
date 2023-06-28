import { Request, Response } from 'express';
export declare class Caches {
    requiredToken(token: any): boolean;
    verifyAutorization(auth: any): string;
    updateCache(atualizar: any): boolean;
    requestUrl(req: any): any;
    actionCache(req: Request, res: Response): void;
}
