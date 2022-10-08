const APIHelper = require('../helpers/user');
const ErrorUtils = require('../../utils/error_utils');
const User = require('../models/users');

const APIUtility = module.exports;

APIUtility.registerUser = async (req, res) => {
    try {
        // const { user } = req;
        const payload = await APIHelper.registerUser({ ...req.body });
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.registerUser: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}


APIUtility.login = async (req, res) => {
    try {
        // const { user } = req;
        const payload = await APIHelper.login({ ...req.body });
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.login: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}

APIUtility.getAllUsers = async (req, res) => {
    try {
        // const { user } = req;
        const response = await User.find({});
        // const payload = await UserHelper.registerUser({ ...req.body });
        return res.status(200).send(response);
    } catch (error) {
        console.error(`ERROR in UserHelper.getAllUsers: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}
// buyer
APIUtility.getAllSeller = async (req, res) => {
    try {
        // const { user } = req;
        const payload = await APIHelper.getAllSeller();
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.getAllSeller: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}

APIUtility.getSellerCatalog = async (req, res) => {
    try {
        const { user } = req;
        const payload = await APIHelper.getSellerCatalog({user, ...req.params, ...req.query});
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.getSellerCatalog: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}

APIUtility.createOrder = async (req, res) => {
    try {
        const { user } = req;
        const payload = await APIHelper.createOrder({user, ...req.params, ...req.query, ...req.body});
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.createOrder: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}


// seller
APIUtility.createCatalog = async (req, res) => {
    try {
        const { user } = req;
        const payload = await APIHelper.createCatalog({user, ...req.body});
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.createCatalog: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}

APIUtility.sellerOrders = async (req, res) => {
    try {
        const { user } = req;
        const payload = await APIHelper.sellerOrders({user, ...req.body, ...req.params});
        return res.status(200).send(payload);
    } catch (error) {
        console.error(`ERROR in UserHelper.createCatalog: ${error}`);
        return ErrorUtils.APIError(res, error);
    }
}
