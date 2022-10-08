const { ObjectId } = require('mongodb');
const JWT = require('jsonwebtoken');
const Globals = require('./globals');
const ErrorUtils = require('../utils/error_utils');
const User = require('../platform/models/users');
const AuthHelper = module.exports;

AuthHelper.isAdmin = async (user) => {
    try {
        if (user.role_permissions && user.role_permissions.length > 0) {
            const { auth_roles } = await UserModel.getUserRolesAndPermissions({ user_id: user._id });
            const userRoles = auth_roles.map((r) => r.role);
            return userRoles.includes(Globals.AUTH_ROLES.BASIC);
        }
        return false;
    } catch (e) {
        return false;
    }
};

/**
 * Create the Token based on user information
 * @param {*} params 
 */
 AuthHelper.createAPIToken = async (params) => {
    const { user } = params;
    // create a token payload
    const tokenPayload = { user_id: user._id };
    const apiToken = JWT.sign(tokenPayload, process.env.JWT_TOKEN_SECRET);
    return {
        api_token: apiToken,
        user: {
            name: user.username, role: user.role || '', _id: user._id,
        },
    }
}

/**
 * Authenticate the APIs using the JWT token which has the tokenPayload
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 AuthHelper.authenticateJWTToken = async (req, res, next) => {
    const apiToken = req.headers.authorization;
    try {
        if (!apiToken) {
            throw Globals.ERRORS.API_TOKEN_HEADER_MISSING;
        }
        const decodedPayload = JWT.verify(apiToken, process.env.JWT_TOKEN_SECRET);
        if (!decodedPayload || !decodedPayload.user_id) {
            throw Globals.ERRORS.API_TOKEN_INVALID_SIGNATURE;
        }
        const user = await User.findUserById(ObjectId(decodedPayload.user_id));
        if (!user) {
            throw Globals.ERRORS.API_TOKEN_USER_INVALID;
        }
        // updating the request object to add the user
        req.user = user;
        return next();
    } catch (error) {
        if (error && error.name === 'JsonWebTokenError') {
            return ErrorUtils.APIError(res, Globals.ERRORS.API_TOKEN_INVALID_SIGNATURE);
        }
        return ErrorUtils.APIError(res, error);
    }
};

/**
 * Authenticate API Route with required permissions
 * @param  {...any} permissions 
 * @returns 
 */
 AuthHelper.isUserAuthorized = (...permissions) => async (req, res, next) => {
    try {
        const { user } = req;
        // TODO: Optimize this using caching
        // 1. Use redis to cache the user roles and permissions data
        // 2. Query roles model directly with user role ids
        if (user.role_permissions && Array.isArray(user.role_permissions) && user.role_permissions.length > 0) {
            const { auth_roles, auth_permissions } = await User.getUserRolesAndPermissions({ user_id: user._id });
            if (auth_permissions && auth_permissions.length > 0) {
                const permissionKeys = auth_permissions.map(p => p.permission);
                const userHasAllPermssions = permissions.every(element => {
                    return permissionKeys.includes(element);
                });
                if (userHasAllPermssions) { return next(); }

                // throw error since user the permissions did not match
                throw Globals.ERRORS.USER_IS_NOT_AUTHORIZED;
            }
        }
        // throw error since user doesn't have any roles or permissions
        throw Globals.ERRORS.USER_IS_NOT_AUTHORIZED;
    } catch (error) {
        return ErrorUtils.APIError(res, error);
    }
}
