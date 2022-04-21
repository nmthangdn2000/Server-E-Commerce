import authRouter from '../router/auth.router';
import userRouter from '../router/user.router';

const initRouter = (app) => {
  app.use('/api', authRouter);
  app.use('/api/user', userRouter);
};

export default initRouter;
