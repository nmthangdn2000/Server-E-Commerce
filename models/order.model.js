import * as BaseModel from './base.model';
import mongoose from 'mongoose';
import { ERROR, STATUS_ORDER } from '../common/constants';

const Schema = mongoose.Schema;
// model name
const name = 'orders';

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
  status: {
    type: Number,
    enum: STATUS_ORDER,
    default: STATUS_ORDER.PENDDING,
  },
};

export default BaseModel.createModel({ name, model });
