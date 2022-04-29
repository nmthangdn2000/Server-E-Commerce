'use strict';

const LIMIT = 10;
const PAGE = 1;

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const RESPONSE = {
  SUCCESS: 'Success',
  LOGIN_SUCCESS: 'Login Success',
  REGISTER_SUCCESS: 'Register Success',
  VERIFY_EMAIL_SUCCESS: 'Verify email success',
  SEND_VERIFY_EMAIL_SUCCESS: 'Send verify email success',
  SEND_TOKEN_RESET_PASSWORD_SUCCESS: 'Send token reset password success',
  CHANGE_PASSWORD_SUCCESS: 'change password success',
};

const ERROR = {
  Default: 100,
  InternalServerError: 101,
  NoData: 102,
  AccountDoesNotExist: 103,
  PasswordIsNotCorrect: 104,
  //user 111 - 130
  CanNotGetUser: 111,
  CanNotCreateUser: 112,
  CanNotDeleteUser: 113,
  CanNotUpdateUser: 114,
  EmailIsExist: 115,
  UserIsRequired: 116,
  EmailIsRequired: 117,
  PasswordIsRequired: 118,
  CantNotVerifyEmail: 119,
  CantNotSendVerifyEmail: 120,
  CantNotResetPassword: 121,
  CantNotUpdatePassword: 122,
  FirstNameIsRequired: 122,
  LastNameIsRequired: 122,
  // Product
  ProductIsRequired: 131,
  CanNotGetProduct: 132,
  CanNotCreateProduct: 133,
  CanNotDeleteProduct: 134,
  CanNotUpdateProduct: 135,
  // Categories 141
  NameCategorieIsRequired: 141,
  SlugCategorieIsRequired: 142,
  CanNotGetCategory: 143,
  CanNotCreateCategory: 144,
  CanNotDeleteCategory: 145,
  CanNotUpdateCategory: 146,
  // Products 151
  NameProductIsRequired: 151,
  PriceProductIsRequired: 152,
  SaleProductIsRequired: 153,
  CanNotGetProduct: 154,
  CanNotCreateProduct: 155,
  CanNotDeleteProduct: 156,
  CanNotUpdateProduct: 157,
  CategorieIsRequired: 158,
};

const TYPE_ACCOUNT = {
  ADMIN: 0,
  CUSTOMER: 1,
};

const STATUS_ACCOUNT = {
  ACTIVE: 0,
  BLOCK: 1,
};

const STATUS_ORDER = {
  PENDDING: 0,
  APPROVED: 1,
};

export { LIMIT, PAGE, HttpMethod, ERROR, RESPONSE, TYPE_ACCOUNT, STATUS_ACCOUNT, STATUS_ORDER };
