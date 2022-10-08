const APIUtils = require('./routes/api');

module.exports = {
    '/': APIUtils.getAllUsers,
    //
    '/auth/register': APIUtils.register,
    '/auth/login': APIUtils.login,
    //
    '/buyer/list-of-sellers': APIUtils.get_all_sellers,
    '/buyer/seller-catalog/{seller_id}': APIUtils.get_seller_by_id,
    '/buyer/create-order/{seller_id}': APIUtils.create_order,
    //
    '/seller/create-catalog': APIUtils.create_catalog,
    '/seller/orders': APIUtils.seller_orders,
};
