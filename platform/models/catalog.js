const mongoose = require('mongoose')

CatalogSchema = new mongoose.Schema({
    catalog_name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    collection: 'catalog',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

CatalogModel = mongoose.model('catalog', CatalogSchema)

module.exports = CatalogModel