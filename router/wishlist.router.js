import { route, addRoot } from './base.router';
import { HttpMethod } from '../common/constants';
import * as wishlistController from '../controllers/wishlist.controller';

const initRoute = () => {
  // route({ method: HttpMethod.GET, action: wishlistController.getAll });
  route({ method: HttpMethod.GET, action: wishlistController.getByUser });
  route({ method: HttpMethod.POST, url: '', action: wishlistController.create });
  route({ method: HttpMethod.DELETE, url: '/:id', action: wishlistController.deleteById });
  route({ method: HttpMethod.PUT, url: '/:id', action: wishlistController.updateById });
};

export default addRoot(initRoute);
