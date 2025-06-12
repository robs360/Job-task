import express from 'express'
import { userRoutes } from '../app/modules/user/user.route';

const router = express.Router()
const modulesRouter = [
    {
        path: '/user',
        route: userRoutes
    }
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
