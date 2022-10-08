module.exports = {
    register: {
        post: {
            tags: ['auth'],
            summary: '',
            operationId: 'register',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
                {
                    name: 'register',
                    in: 'body',
                    type: 'object',
                    example: {
                        'username': 'test user',
                        'password': 'test 123',
                        'role': 'buyer'
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Register success',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    login: {
        post: {
            tags: ['auth'],
            summary: '',
            operationId: 'login',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
            {
                name: 'login',
                in: 'body',
                type: 'object',
                example: {
                    'username': 'test user',
                    'password': 'test 123',
                },
            },
            ],
            responses: {
                200: {
                    description: 'Auth success',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
        
    },
    get_all_sellers: {
        get: {
            tags: ['Buyer'],
            summary: 'Get all sellers',
            operationId: 'getAllSeller',
            produces: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            }],
            responses: {
                200: {
                    description: 'Ok.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    get_seller_by_id: {
        get: {
            tags: ['Buyer'],
            summary: 'Get seller by id',
            operationId: 'get seller by id',
            produces: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            },
            {
                name: 'seller_id',
                in: 'path',
                description: 'seller id',
                required: true,
                schema: {
                    type: 'integer',
                    format: 'int64',
                },
            }],
            responses: {
                200: {
                    description: 'Ok.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    create_order: {
        post: {
            tags: ['Buyer'],
            summary: '',
            operationId: 'create_order',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
                {
                    name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
                },
            {
                name: 'create_order',
                in: 'body',
                type: 'object',
                example: {
                    "product_id":"63418f21dd1b0c5f3f74d98f"
                }
            },
            ],
            responses: {
                200: {
                    description: 'Order created',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    create_catalog: {
        post: {
            tags: ['Seller'],
            summary: '',
            operationId: 'create_catalog',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [
                {
                    name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
                },
            {
                name: 'create_catalog',
                in: 'body',
                type: 'object',
                example: {
                    "product_name":"Fridge",
                    "category":"Electronics",
                    "price":55000
                }
            },
            ],
            responses: {
                200: {
                    description: 'Catalog created',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    seller_orders: {
        get: {
            tags: ['Seller'],
            summary: '',
            operationId: 'seller_orders',
            produces: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            }],
            responses: {
                200: {
                    description: 'Ok.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    }
}