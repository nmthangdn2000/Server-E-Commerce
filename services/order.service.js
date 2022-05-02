import { ERROR } from '../common/constants';
import OrderModel from '../models/order.model';

// const getAll = async () => {
//   const cart = await OrderModel.find();
//   if (!cart) throw new Error(ERROR.CanNotGetCart);
//   return cart;
// };

const getByIdUser = async (user) => {
  const cart = await OrderModel.find({ user })
    // .populate('user')
    .populate('product');
  if (!cart) throw new Error(ERROR.CanNotGetCart);
  return cart;
};

const create = async (data) => {
  if (!data.product || !data.user) throw new Error(ERROR.CanNotCreateCart);
  const newCart = new OrderModel({
    ...data,
  });
  const cart = await newCart.save();
  if (!cart) throw new Error(ERROR.CanNotCreateCart);
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeleteCart);
  const cart = await OrderModel.findByIdAndDelete(id);
  if (!cart) throw new Error(ERROR.CanNotDeleteCart);
};

const updateById = async (id, data) => {
  if (!id) throw new Error(ERROR.CanNotUpdateCart);
  const update = await OrderModel.updateOne({ _id: id }, { ...data, updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CanNotUpdateCart);
};

export { getByIdUser, create, deleteById, updateById };
