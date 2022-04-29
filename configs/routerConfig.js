import authRouter from '../router/auth.router';
import userRouter from '../router/user.router';
import categoryRouter from '../router/category.router';
import productRouter from '../router/product.router';

const initRouter = (app) => {
  app.use('/api', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);
};

export default initRouter;
