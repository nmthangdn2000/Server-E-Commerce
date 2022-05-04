import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as cartController from '../controllers/cart.controller';

const initRoute = () => {
  // route({ method: HttpMethod.GET, action: cartController.getAll });
  route({ method: HttpMethod.GET, action: cartController.getByUser });
  route({ method: HttpMethod.POST, url: '', action: cartController.create });
  route({ method: HttpMethod.DELETE, url: '/:id', action: cartController.deleteById });
  route({ method: HttpMethod.PUT, url: '/:id', action: cartController.updateById });
};

export default addRoot(initRoute);
