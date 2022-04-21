import * as BaseModel from './base.model';
import mongoose from 'mongoose';
import { ERROR } from '../common/constants';

const Schema = mongoose.Schema;
// model name
const name = 'carts';

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
  amount: {
    type: Number,
    default: 1,
  },
};

export default BaseModel.createModel({ name, model });
