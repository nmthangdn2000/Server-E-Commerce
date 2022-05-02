import * as orderService from '../services/order.service';
import { responseError, responseSuccess, responseSuccessWithData } from './base.controller';

// const getAll = async (req, res) => {
//   try {
//     const data = await orderService.getAll();
//     responseSuccessWithData(res, data);
//   } catch (error) {
//     console.log(error);
//     responseError(res, error.message);
//   }
// };

const getByIdUser = async (req, res) => {
  try {
    const data = await orderService.getByIdUser(req.params.id);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const create = async (req, res) => {
  try {
    await orderService.create(req.body);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    await orderService.deleteById(req.params.id);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const updateById = async (req, res) => {
  try {
    await orderService.updateById(req.params.id, req.body);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

export { getByIdUser, create, deleteById, updateById };
