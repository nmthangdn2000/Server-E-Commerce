import * as BaseModel from './base.model';
import mongoose from 'mongoose';
import { ERROR } from '../common/constants';

const Schema = mongoose.Schema;
// model name
const name = 'wishlist';

const model = {
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: [true, ERROR.ProductIsRequired.toString()],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, ERROR.UserIsRequired.toString()],
  },
};

export default BaseModel.createModel({ name, model });
