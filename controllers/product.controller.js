import * as productService from '../services/product.service';
import { responseError, responseSuccess, responseSuccessWithData } from './base.controller';

const getAll = async (req, res) => {
  try {
    const data = await productService.getAll(req.query);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const getById = async (req, res) => {
  try {
    const data = await productService.getById(req.params.id);
    responseSuccessWithData(res, data);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const create = async (req, res) => {
  try {
    await productService.create(req.body, req.files);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    await productService.deleteById(req.params.id);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

const updateById = async (req, res) => {
  try {
    await productService.updateById(req.params.id, req.body, req.files);
    responseSuccess(res);
  } catch (error) {
    console.log(error);
    responseError(res, error.message);
  }
};

export { getAll, getById, create, deleteById, updateById };
