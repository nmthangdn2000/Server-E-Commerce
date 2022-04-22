import { ERROR } from '../common/constants';
import CategoryModel from '../models/category.model';

const getAll = async () => {
  const category = await CategoryModel.find();
  if (!category) throw new Error(ERROR.CanNotGetCategory);
  return category;
};

const getById = async (id) => {
  const category = await CategoryModel.findById(id);
  if (!category) throw new Error(ERROR.CanNotGetCategory);
  return category;
};

const create = async (name) => {
  if (!name) throw new Error(ERROR.CanNotCreateCategory);
  const slug = changeToSlug(name);
  const newCategory = new CategoryModel({
    name,
    slug,
  });
  const category = await newCategory.save();
  if (!category) throw new Error(ERROR.CanNotCreateCategory);
};

const deleteById = async (id) => {
  if (!id) throw new Error(ERROR.CanNotDeleteCategory);
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) throw new Error(ERROR.CanNotDeleteCategory);
};

const updateById = async (id, name) => {
  if (!id || !name) throw new Error(ERROR.CanNotUpdateCategory);
  const slug = changeToSlug(name);
  const update = await CategoryModel.updateOne({ _id: id }, { name, slug, updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CanNotUpdateCategory);
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
