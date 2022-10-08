const User = require('../models/users');
const Product = require('../models/product');
const Transaction = require('../models/transaction');
const AuthHelper = require('../../utils/auth_utils');
const Globals = require('../../utils/globals');
const { ObjectId } = require('mongodb');

const APIHelper = module.exports;

APIHelper.registerUser = async (params) => {
    try {
        const {username, password, role, status} = params;
        let user;
        user = await User.create({
            username,
            role,
            status,
            password
        });
        // user = await User.getBaseUserObject({...params, role});
        return {message: 'User registered', user: {name: user.username, role: user.role || '', _id: user._id, role_permissions:user.role_permissions}};
    } catch (e) {
        throw e;
    }
}

APIHelper.login = async (params) => {
    try {
        const {username, password, role, status} = params;
        const encUserName = await User.getEncryptedUsername(username);
        const encPassword = await User.getEncryptedPassword(password);
        userRecord = await User.findUserByUsername(encUserName);
        if(userRecord) {
            if(userRecord.password==await User.getDecryptedPassword(encPassword)) {
                const authTokenResponse = await AuthHelper.createAPIToken({ user: userRecord });
                return { authTokenResponse};
            }
        }
        throw new Error('Login failed');
    } catch (e) {
        throw e;
    }
}

//buyer
APIHelper.getAllSeller = async (params) => {
    try {
        // const {user} = params;
        // const sellers = await Globals.getRecord(User, { role: 'seller' });
        const sellers = await User.find({ role: 'seller' })
        return sellers;
    } catch (e) {
        throw e;
    }
}

APIHelper.getSellerCatalog = async (params) => {
    try {
        const {user, seller_id} = params;
        const sellerCatalog = await Product.find({seller: ObjectId(seller_id)})
        return sellerCatalog;
    } catch (e) {
        throw e;
    }
}

APIHelper.createOrder = async (params) => {
    try {
        const {user, seller_id} = params;
        const {product_id}= params;
        const product = await Product.findById({_id: ObjectId(product_id)});
        if (!product) {
            throw ({
                message: `cannot find product with given id: ${product_id}`,
                status_code: 400
            })
        }
        const isTransacted = await Transaction.findOne({
            product_id: ObjectId(product_id)
        })
        if (isTransacted) throw ({
            message: `cannot find purchase with given id: ${product_id}`,
            status_code: 400
        })
        const seller = await User.findById({_id: ObjectId(seller_id), role:'seller'});
        if(!seller) {
            throw ({
                message: `cannot find product with given id: ${product_id}`,
                status_code: 400
            })
        }
        const transaction = await Transaction.create({
            seller: ObjectId(seller_id),
            buyer: ObjectId(user._id),
            product_id: ObjectId(product_id)
        })
        return transaction;
    } catch (e) {
        throw e;
    }
}

// seller
APIHelper.createCatalog = async (params) => {
    const { user } = params;;
    try {
        const product = await Product.create({...params,seller: user._id})
        return product;
    } catch (e) {
        throw e;;
    }
}

APIHelper.sellerOrders = async (params) => {
    const { user } = params;;
    try {
        const sellerOrders = await Transaction.find({seller: ObjectId(user._id)})
        return sellerOrders;
    } catch (e) {
        throw e;;
    }
}