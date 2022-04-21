import * as BaseModel from './base.model';
import mongoose from 'mongoose';
import { ERROR, STATUS_ORDER } from '../common/constants';

// model name
const name = 'categories';

const model = {
  name: {
    type: String,
    require: [true, ERROR.NameCategorieIsRequired.toString()],
  },
  slug: {
    type: String,
    require: [true, ERROR.SlugCategorieIsRequired.toString()],
  },
};

export default BaseModel.createModel({ name, model });
