const mongoose = require('mongoose')
TransactionSchema = mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    collection: 'transaction',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

TransactionSchema.statics.create = async function (params) {
    const newTransaction = new TransactionModel({
        ...params,
    })
    await newTransaction.save();
    return newTransaction;
}

TransactionModel = mongoose.model('transaction', TransactionSchema)

module.exports = TransactionModel