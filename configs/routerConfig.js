import authRouter from '../router/auth.router';
import userRouter from '../router/user.router';
import categoryRouter from '../router/category.router';
import productRouter from '../router/product.router';
import cartRouter from '../router/cart.router';
import orderRouter from '../router/order.router';
import wishlistRouter from '../router/wishlist.router';

const initRouter = (app) => {
  app.use('/api', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/order', orderRouter);
  app.use('/api/wishlist', wishlistRouter);
};

export default initRouter;
