import User from '../models/user.model';
import { ERROR } from '../common/constants';
import * as PasswordHash from '../common/hashPassword';
import jwt from 'jsonwebtoken';
import appConfig from '../configs/appConfig';
import * as mailer from '../helpers/mailer';

const login = async (email, password) => {
  const query = {
    email,
    password: PasswordHash.sha512(password),
  };
  const user = await User.findOne(query).select('-password').lean();
  if (!user) throw new Error(ERROR.AccountDoesNotExist);
  const { _id, firstName, lastName, ...data } = user;
  const token = endCodeToken({ _id, firstName, lastName });
  return { ...user, token };
};

const register = async (data) => {
  let { password, ...objectUser } = data;
  password = PasswordHash.sha512(password);
  const newUser = new User({
    ...objectUser,
    password,
  });
  const user = await newUser.save();
  if (!user) throw new Error(ERROR.CanNotCreateUser);
  const { firstName, lastName, email } = data;
  const token = PasswordHash.sha512(tokenVerifyEmail(`${firstName} ${lastName}`, email, user.updatedAt));
  mailer.sendMail(email, subject, htmlVerifyEmail(`${firstName} ${lastName}`, email, token));
};

const verifyEmail = async (email, tokenUrl) => {
  const user = await User.findOne({ email }).lean();
  const { _id, firstName, lastName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenVerifyEmail(`${firstName} ${lastName}`, email, updatedAt));
  if (tokenUrl != token) throw new Error(ERROR.CantNotVerifyEmail);
  const update = await User.updateOne({ _id }, { verify_email: new Date(), updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CantNotVerifyEmail);
};

const sendVerifyEmail = async (email) => {
  if (!email) throw Error(ERROR.CantNotSendVerifyEmail);
  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.CantNotSendVerifyEmail);
  const { firstName, lastName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenVerifyEmail(`${firstName} ${lastName}`, email, updatedAt));
  mailer.sendMail(email, subject, htmlVerifyEmail(`${firstName} ${lastName}`, email, token));
};

const forgotPassword = async (email) => {
  if (!email) throw Error(ERROR.CantNotResetPassword);
  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.CantNotResetPassword);
  const { firstName, lastName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenResetPassword(`${firstName} ${lastName}`, email, updatedAt));
  mailer.sendMail(email, subject, htmlResetPassword(`${firstName} ${lastName}`, email, token));
};

const resetPassword = async (email, tokenUrl) => {
  const user = await User.findOne({ email }).lean();
  const { firstName, lastName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenResetPassword(`${firstName} ${lastName}`, email, updatedAt));
  if (tokenUrl != token) throw new Error(ERROR.CantNotResetPassword);
};

const changePassword = async (email, password, tokenUrl) => {
  if (!email || !password || !tokenUrl) throw Error(ERROR.CantNotUpdatePassword);

  const user = await User.findOne({ email }).lean();
  if (!user) throw Error(ERROR.CantNotUpdatePassword);

  const { firstName, lastName, updatedAt } = user;
  const token = PasswordHash.sha512(tokenResetPassword(`${firstName} ${lastName}`, email, updatedAt));
  if (tokenUrl != token) throw new Error(ERROR.CantNotUpdatePassword);

  password = PasswordHash.sha512(password);
  const update = await User.updateOne({ email }, { password, updatedAt: new Date() });
  if (update.modifiedCount < 1) throw new Error(ERROR.CantNotUpdatePassword);
};

export { login, register, verifyEmail, sendVerifyEmail, forgotPassword, resetPassword, changePassword };

const subject = 'Verify email';

const tokenVerifyEmail = (name, email, password) => `${name}-${email}-${password}-verifyemail`;
const tokenResetPassword = (name, email, password) => `${name}-${email}-${password}-resetpassword`;

const endCodeToken = (data) => {
  return jwt.sign(data, appConfig.KEY_SECRET_JWT, { expiresIn: '30d' });
};

const htmlVerifyEmail = (name, email, token) => `
<p>Hello <strong>${name}</strong></p>
<p>Thank you for registering an account on our website vicodin.com</p>
<p>
  To have a good experience, please click the button below to verify your email:
</p>
<a style="
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 50px;
  " href="http://localhost:3000/login">
  Verify email
</a>
<div style="margin-top: 20px">
  <strong style="font-size: 50px"> Wellcome to Vicodin </strong>
</div>
`;

const htmlResetPassword = (name, email, token) => `
<p>Hello <strong>${name}</strong></p>
<p>To reset your password at vicodin.com website please click the button below:</p>
<a style="
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 50px;
  " href="http://localhost:3000/reset-password">
  Reset Password
</a>
<div style="margin-top: 20px">
  <strong style="font-size: 50px"> Wellcome to Vicodin </strong>
</div>
`;
