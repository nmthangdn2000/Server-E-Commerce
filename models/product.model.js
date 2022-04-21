import * as BaseModel from './base.model';
import mongoose from 'mongoose';
import { ERROR } from '../common/constants';

const Schema = mongoose.Schema;
// model name
const name = 'products';

const model = {
  name: {
    type: String,
    require: [true, ERROR.NameCategorieIsRequired.toString()],
  },
  images: [String],
  star: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    require: [true, ERROR.NameCategorieIsRequired.toString()],
  },
  sale: {
    type: Number,
    require: [true, ERROR.NameCategorieIsRequired.toString()],
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: [true, ERROR.UserIsRequired.toString()],
    },
  ],
  description: String,
};

export default BaseModel.createModel({ name, model });
