const express = require('express');
const router = express.Router();
const APIUtility = require('../apis/user');
const AuthHelper = require('../../utils/auth_utils');

router.get('/', APIUtility.getAllUsers);

router.post('/auth/register', APIUtility.registerUser);
router.post('/auth/login', APIUtility.login);

// buyer
router.get('/buyer/list-of-sellers', AuthHelper.authenticateJWTToken, AuthHelper.isUserAuthorized('buyer.get.seller'), APIUtility.getAllSeller);
router.get('/buyer/seller-catalog/:seller_id', AuthHelper.authenticateJWTToken, AuthHelper.isUserAuthorized('buyer.get.catalog'), APIUtility.getSellerCatalog);
router.post('/buyer/create-order/:seller_id', AuthHelper.authenticateJWTToken, AuthHelper.isUserAuthorized('buyer.create.order'), APIUtility.createOrder);

// seller
router.post('/seller/create-catalog', AuthHelper.authenticateJWTToken, AuthHelper.isUserAuthorized('seller.create.catalog'), APIUtility.createCatalog);
router.get('/seller/orders', AuthHelper.authenticateJWTToken, AuthHelper.isUserAuthorized('seller.get.orders'), APIUtility.sellerOrders);

module.exports = router;