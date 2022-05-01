import { ERROR, LIMIT, PAGE } from '../common/constants';
import ProductModel from '../models/product.model';
import { listStringImage, pagination, deleteFile } from './base.service';

const getAll = async ({ q = '', page = PAGE, limit = LIMIT, sort }) => {
  const query = q
    ? {
        $or: [
          {
            $text: { $search: q },
          },
        ],
      }
    : {};
  const count = ProductModel.find(query).countDocuments();
  // chưa làm sort
  const getProducts = ProductModel.find(query)
    .populate('categories', 'name slug')
    .skip(page * limit - limit)
    .limit(Number(limit));
  const [total, products] = await Promise.all([count, getProducts]);
  if (!products) throw new Error(ERROR.CanNotGetUser);
  return {
    data: products,
    currentPage: Number(page),
    totalPage: pagination(total, limit),
  };
};

const getById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) throw new Error(ERROR.CanNotGetProduct);
  return product;
};

const create = async (data, files) => {
  if (!data.name || !data.price || !data.categories) throw new Error(ERROR.CanNotCreateProduct);
  data.categories = data.categories.split(',').map((category) => category.trim());
  const newProduct = new ProductModel({
    ...data,
    images: listStringImage(files),
  });
  const product = await newProduct.save();
  if (!product) throw new Error(ERROR.CanNotCreateProduct);
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeleteProduct);
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) throw new Error(ERROR.CanNotDeleteProduct);
  product.images.forEach((image) => {
    deleteFile(image);
  });
};

const updateById = async (id, data, files) => {
  console.log(files);
  if (!id) throw new Error(ERROR.CanNotUpdateProduct);
  if (files && files.length > 0) data.images = listStringImage(files);

  const product = await ProductModel.findByIdAndUpdate(id, { ...data, updatedAt: new Date() });
  if (!product) throw new Error(ERROR.CanNotUpdateProduct);

  if (files && files.length > 0) {
    product.images.forEach((image) => {
      deleteFile(image);
    });
  }
};

export { getAll, getById, create, deleteById, updateById };
