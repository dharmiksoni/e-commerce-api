const mongoose = require('mongoose');
const Globals = require('../../utils/globals');

const AuthRoles = new mongoose.Schema({
    name: String,
    role: {
        type: String,
        enum: [
            'buyer',
            'seller',
        ],
    },
    meta: Object,
    permissions: [mongoose.Types.ObjectId],
}, {
    collection: 'auth_role',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

AuthRoles.statics.getRole = async (params) => {
    const { role } = params;
    const roleObject = await Globals.getRecord(AuthRolesModel, { role });
    return roleObject;
}

const AuthRolesModel = mongoose.model('auth_role', AuthRoles);

module.exports = AuthRolesModel;
