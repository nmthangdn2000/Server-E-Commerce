import { ERROR } from '../common/constants';
import CartModel from '../models/cart.model';

// const getAll = async () => {
//   const cart = await CartModel.find();
//   if (!cart) throw new Error(ERROR.CanNotGetCart);
//   return cart;
// };

const getByUser = async (user) => {
  const cart = await CartModel.find({ user })
    // .populate('user')
    .populate('product');
  if (!cart) throw new Error(ERROR.CanNotGetCart);
  return cart;
};

const create = async (data, user) => {
  if (!data.product || !user) throw new Error(ERROR.CanNotCreateCart);
  const checkProduct = await CartModel.findOne({ product: data.product, user }).select('_id amount');
  if (checkProduct) {
    return await updateById(checkProduct._id, { amount: checkProduct.amount + 1 });
  }
  const newCart = new CartModel({
    ...data,
    user,
  });
  const cart = await newCart.save();
  if (!cart) throw new Error(ERROR.CanNotCreateCart);
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeleteCart);
  const cart = await CartModel.findByIdAndDelete(id);
  if (!cart) throw new Error(ERROR.CanNotDeleteCart);
};

const updateById = async (id, data) => {
  if (!id) throw new Error(ERROR.CanNotUpdateCart);
  const update = await CartModel.updateOne({ _id: id }, { ...data, updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CanNotUpdateCart);
};

export { getByUser, create, deleteById, updateById };
