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
  const product = await ProductModel.findById(id).populate('categories', 'name slug');
  if (!product) throw new Error(ERROR.CanNotGetProduct);
  return product;
};

const create = async (data, files) => {
  if (!data.name || !data.price || !data.categories) throw new Error(ERROR.CanNotCreateProduct);
  data.categories = data.categories.split(',').map((category) => category.trim());
  data.slug = changeToSlug(data.name);
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

const changeToSlug = (title) => {
  let slug;

  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  //Xóa các ký tự đặt biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-');
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  //In slug ra textbox có id “slug”
  return slug;
};
