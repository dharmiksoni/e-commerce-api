const mongoose = require('mongoose')

ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: [
            'Electronics',
            'Home',
            'Musical',
            'Sports',
            'Toys',
            'Beauty',
            'Clothing'
        ],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    collection: 'product',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

ProductSchema.statics.create = async function (params) {
    const newProduct = new ProductModel({
        ...params,
    })
    await newProduct.save();
    return newProduct;
}

ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel