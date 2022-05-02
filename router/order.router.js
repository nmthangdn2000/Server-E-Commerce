import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as orderController from '../controllers/order.controller';

const initRoute = () => {
  // route({ method: HttpMethod.GET, action: orderController.getAll });
  route({ method: HttpMethod.GET, url: '/:id', action: orderController.getByIdUser });
  route({ method: HttpMethod.POST, url: '', action: orderController.create });
  route({ method: HttpMethod.DELETE, url: '/:id', action: orderController.deleteById });
  route({ method: HttpMethod.PUT, url: '/:id', action: orderController.updateById });
};

export default addRoot(initRoute);
