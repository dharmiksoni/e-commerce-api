module.exports = {
    schemas: {
        users: {
            title: 'users',
            required: [ 'username', 'password' ],
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
              role: { type: 'string', enum: [Array] },
              status: { type: 'string' },
              role_permissions: { type: 'array', items: [Object] },
              updated_at: { type: 'string', format: 'date-time' },
              created_at: { type: 'string', format: 'date-time' },
            }
        },
        transaction:{
            title: 'transaction',
            required: [ 'seller', 'buyer', 'product_id' ],
            properties: {
                seller: { type: 'string' },
                buyer: { type: 'string' },
                product_id: { type: 'string' },
                _id: { type: 'string' },
                updated_at: { type: 'string', format: 'date-time' },
                created_at: { type: 'string', format: 'date-time' }
            }
        },
        product: {
            title: 'product',
            required: [ 'product_name', 'category', 'price', 'seller' ],
            properties: {
              product_name: { type: 'string' },
              category: { type: 'string', enum: [Array] },
              price: { type: 'number' },
              seller: { type: 'string' },
            }
        },
        auth_role: {
            title: 'auth_role',
            properties: {
              name: { type: 'string' },
              role: { type: 'string', enum: [Array] },
              meta: { type: 'object', properties: {} },
              permissions: { type: 'array', items: [Object] },
            }
        },
        auth_permission: {
            title: 'auth_permission',
            properties: {
              name: { type: 'string' },
              meta: { type: 'object', properties: {} },
              permissions: { type: 'array', items: [Object] },
            }
        }
    },
};
