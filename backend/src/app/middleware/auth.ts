import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../modules/user/user.model';
import asyncHandler from 'express-async-handler';

interface JwtPayload {
    email: string;
    name: string;
    image: string;
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

const authMiddleware = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error("You are not authorized");
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'abcfeakljdfkl12@') as JwtPayload;

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
        throw new Error("You are not authorized");
    }

    req.user = {
        email: user.email,
        name: user.name,
        image: user.image
    };

    next();
});

export default authMiddleware;
