const mongoose = require('mongoose');

const AuthPermissions = new mongoose.Schema({
    name: String,
    permission: {
        type: String,
    },
    meta: Object,
},
    {
        collection: 'auth_permission',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

const AuthPermissionsModel = mongoose.model('auth_permission', AuthPermissions);

module.exports = AuthPermissionsModel;
