import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as CartController from '../controllers/cart.controller';

const initRoute = () => {
  // route({ method: HttpMethod.GET, action: CartController.getAll });
  route({ method: HttpMethod.GET, url: '/:id', action: CartController.getByIdUser });
  route({ method: HttpMethod.POST, url: '', action: CartController.create });
  route({ method: HttpMethod.DELETE, url: '/:id', action: CartController.deleteById });
  route({ method: HttpMethod.PUT, url: '/:id', action: CartController.updateById });
};

export default addRoot(initRoute);
