const mongoose = require('mongoose');

const paypaSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }


}, { timestamps: true })


const Payment = mongoose.model('Payment', paypaSchema);

module.exports = { Payment }