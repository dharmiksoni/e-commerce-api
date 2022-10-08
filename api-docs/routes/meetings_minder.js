module.exports = {
    create_calendar_event: {
        post: {
            tags: ['Meetings'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            },
            {
                name: 'meetings',
                in: 'body',
                type: 'object',
                properties: {
                    event: {
                        type: 'object',
                        properties: {
                            summary: { type: 'string' },
                            description: { type: 'string' },
                            start: { type: 'object', properties: [Object] },
                            end: { type: 'object', properties: [Object] },
                            attendees: { type: 'string', enum: [Array] },
                        },
                    },
                    calendarId: { type: 'string' },
                },
            },
            ],
            responses: {
                200: {
                    description: 'Event created.',
                },
                201: {
                    description: 'Event created.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    agenda: {
        post: {
            tags: ['Agendas'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            },
            {
                name: 'calendar_event_id',
                in: 'params',
                type: 'params',
            },
            {
                name: 'agendas',
                in: 'body',
                type: 'object',
                properties: {
                    agenda_item: {
                        type: 'object',
                        title: 'Agenda Item',
                        properties: {
                            title: { type: 'string' },
                            status: { type: 'string', enum: [Array] },
                            description: { type: 'string' },
                            event_id: { type: 'string' },
                            created_by_user_id: { type: 'string' },
                            update_history: { type: 'array', items: [Object] },
                            type: { type: 'string' },
                            duration: { type: 'number' },
                            tags: { type: 'array', items: [Object] },
                            settings: { type: 'array', items: [Object] },
                            link: { type: 'string' },
                            position: { type: 'number' },
                            activity_meta: { type: 'object', properties: {} },
                        },

                    },
                },
            },

            ],
            responses: {
                200: {
                    description: 'Agenda created.',
                },
                201: {
                    description: 'Agenda created.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
        put: {
            tags: ['Agendas'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            },
            {
                name: 'calendar_event_id',
                in: 'params',
                type: 'params',
            },
            {
                name: 'agendas',
                in: 'body',
                type: 'object',
                properties: {
                    agenda_item: {
                        type: 'object',
                        title: 'Agenda Item',
                        properties: {
                            title: { type: 'string' },
                            status: { type: 'string', enum: [Array] },
                            description: { type: 'string' },
                            event_id: { type: 'string' },
                            created_by_user_id: { type: 'string' },
                            update_history: { type: 'array', items: [Object] },
                            type: { type: 'string' },
                            duration: { type: 'number' },
                            tags: { type: 'array', items: [Object] },
                            settings: { type: 'array', items: [Object] },
                            link: { type: 'string' },
                            position: { type: 'number' },
                            activity_meta: { type: 'object', properties: {} },
                        },

                    },
                },
            },

            ],
            responses: {
                200: {
                    description: 'Agenda updated.',
                },
                201: {
                    description: 'Agenda updated.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
        get: {
            tags: ['Agendas'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            },
            {
                name: 'calendar_event_id',
                in: 'params',
                type: 'params',
            },
            ],
            responses: {
                200: {
                    description: 'Retrieve the all agendas.',
                },
                201: {
                    description: 'Retrieve the all agendas.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    delete_agenda: {
        delete: {
            tags: ['Agendas'],
            summary: '',
            produces: ['application/json'],
            consumes: ['application/json'],
            parameters: [{
                name: 'Authorization', in: 'header', type: 'string', description: 'auth token',
            },
            {
                name: 'calendar_event_id',
                in: 'params',
                type: 'params',
            },
            {
                name: 'agendas',
                in: 'body',
                type: 'object',
                properties: {
                    agenda_item: {
                        type: 'object',
                        title: 'Agenda Item',
                        properties: {
                            agenda_item_id: { type: 'string' },
                            agenda_id: { type: 'string' },
                            event_id: { type: 'string' },
                        },

                    },
                },
            },

            ],
            responses: {
                200: {
                    description: 'Agenda deleted.',
                },
                201: {
                    description: 'Agenda deleted.',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
};
