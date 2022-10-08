const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
const Globals = require('../../utils/globals');
const AuthRolesModel = require('./auth_role');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['buyer','seller'],
    ref: 'Role',
  },
  status: {
    type: String,
    default: 'active'
  },
  role_permissions: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
},
{
    collection: 'user',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

UserSchema.plugin(mongooseFieldEncryption, {
  fields: ['password', 'username'],
  secret: process.env.MONGODB_ENCRYPTION_SECRET,
  saltGenerator: (secret) => { return process.env.MONGODB_ENCRYPTION_SALT.slice(0, 16); }
});

UserSchema.statics.create = async function (params) {
  const data = await UserModel.getBaseUserObject({...params});
  const newAccount = new UserModel({
      ...data,
  })
  await newAccount.save();
  if (newAccount) {
    newAccount.decryptFieldsSync();
    newAccount.stripEncryptionFieldMarkers();
}
  return newAccount;
}

UserSchema.statics.getEncryptedUsername = (username) => {
  try {
      const tmpObject = new UserModel({ username });
      tmpObject.encryptFieldsSync();
      return tmpObject.username;
  } catch (e) {
      return '';
  }
}

UserSchema.statics.getEncryptedPassword = (password) => {
  try {
      const tmpObject = new UserModel({ password });
      tmpObject.encryptFieldsSync();
      return tmpObject.password;
  } catch (e) {
      return '';
  }
}

UserSchema.statics.getDecryptedUsername = (username) => {
  try {
      const tmpObject = new UserModel({ username });
      tmpObject.__enc_username = true;
      tmpObject.decryptFieldsSync()
      return tmpObject.username;
  } catch (e) {
      return '';
  }
}
UserSchema.statics.getDecryptedPassword = (password) => {
  try {
      const tmpObject = new UserModel({ password });
      tmpObject.__enc_password = true;
      tmpObject.decryptFieldsSync()
      return tmpObject.password;
  } catch (e) {
      return '';
  }
}

UserSchema.statics.findUserByUsername = async function (user_name) {
  const userRecord = await Globals.getRecord(UserModel, { username: user_name });
  if (userRecord) {
      userRecord.decryptFieldsSync();
      userRecord.stripEncryptionFieldMarkers();
  }
  return userRecord;
}

UserSchema.statics.findUserById = async function (id) {
  const userRecord = await Globals.getRecord(UserModel, { _id: id });
  if (userRecord) {
      userRecord.decryptFieldsSync();
      userRecord.stripEncryptionFieldMarkers();
  }
  return userRecord;
}

UserSchema.statics.decrypt = function (input) {
  if (input && Array.isArray(input)) {
      input.forEach(record => record.decryptFieldsSync());
  } else if (input) {
      input.decryptFieldsSync();
  }
}

UserSchema.statics.getUserRolesAndPermissions = async (params) => {
  const { user_id } = params;
  const allRoles = [];
  const allPermissions = [];
  try {
      const userRolesAggregation = await UserModel.aggregate([
          {
              $match: { _id: ObjectId(user_id.toString()) }
          },
          {
              $unwind: { path: "$role_permissions" }
          },
          {
              $lookup: {
                  from: 'auth_role', localField: 'role_permissions', foreignField: '_id', as: 'roles',
              },
          },
          {
              $unwind: { path: "$roles", preserveNullAndEmptyArrays: true }
          },
          {
              $lookup: {
                  from: 'auth_permission', localField: 'roles.permissions', foreignField: '_id', as: 'auth_permissions',
              },
          },
          {
              $project: {
                  _id: 1,
                  roles: 1,
                  auth_permissions: 1,
              },
          },
      ]);

      // aggregate roles and permissions data
      userRolesAggregation.map((userRoleData) => {
          // roles is object
          allRoles.push(userRoleData.roles);

          // auth_permissions is list of permissions
          if (userRoleData.auth_permissions) {
              userRoleData.auth_permissions.forEach((p) => {
                  allPermissions.push(p);
              });
          }
      });
  } catch (e) {
    throw e;
  }
  return { auth_roles: allRoles, auth_permissions: allPermissions }
}

UserSchema.statics.getBaseUserObject = async (params) => {
  const {role} = params;
  let roleObject;
  if(role.toUpperCase() === Globals.AUTH_ROLES.SELLER) {
    roleObject = await AuthRolesModel.getRole({ role: Globals.AUTH_ROLES.SELLER });
  }
  else {
    roleObject = await AuthRolesModel.getRole({ role: Globals.AUTH_ROLES.BUYER });
  }
  let defaultUserFields = { ...params };
  // add a role for the user
  if (roleObject) {
      defaultUserFields = { ...defaultUserFields, role_permissions: [roleObject._id] }
  }
  return defaultUserFields
  // return new UserModel(defaultUserFields);
}

UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel
