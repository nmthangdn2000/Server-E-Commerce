import * as BaseModel from './base.model';
import mongoose from 'mongoose';
import { ERROR } from '../common/constants';

const Schema = mongoose.Schema;
// model name
const name = 'products';

const model = {
  name: {
    type: String,
    require: [true, ERROR.NameProductIsRequired.toString()],
  },
  images: [String],
  star: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    require: [true, ERROR.PriceProductIsRequired.toString()],
  },
  sale: {
    type: Number,
    require: [true, ERROR.SaleProductIsRequired.toString()],
  },
  categories: [
    {
      // _id: false,
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: [true, ERROR.CategorieIsRequired.toString()],
    },
  ],
  description: String,
};

export default BaseModel.createModel({ name, model });
