import { ERROR } from '../common/constants';
import WishlistModel from '../models/wishlist.model';

// const getAll = async () => {
//   const wishlist = await WishlistModel.find();
//   if (!wishlist) throw new Error(ERROR.CanNotGetWishlist);
//   return wishlist;
// };

const getByUser = async (user) => {
  const wishlist = await WishlistModel.find({ user }).populate({
    path: 'product',
    model: 'products',
    select: '-createdAt -updatedAt',
    populate: {
      path: 'categories',
      model: 'categories',
      select: '-createdAt -updatedAt',
    },
  });

  if (!wishlist) throw new Error(ERROR.CanNotGetWishlist);
  return wishlist;
};

const create = async (data, user) => {
  if (!data.product || !user) throw new Error(ERROR.CanNotCreateWishlist);
  const newWishlist = new WishlistModel({
    ...data,
    user,
  });
  const wishlist = await newWishlist.save();
  if (!wishlist) throw new Error(ERROR.CanNotCreateWishlist);
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeleteWishlist);
  const wishlist = await WishlistModel.findByIdAndDelete(id);
  if (!wishlist) throw new Error(ERROR.CanNotDeleteWishlist);
};

const updateById = async (id, data) => {
  if (!id) throw new Error(ERROR.CanNotUpdateWishlist);
  const update = await WishlistModel.updateOne({ _id: id }, { ...data, updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CanNotUpdateWishlist);
};

export { getByUser, create, deleteById, updateById };
