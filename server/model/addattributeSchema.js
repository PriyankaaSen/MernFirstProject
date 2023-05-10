const mongoose = require('mongoose');

const AttributeSchema = new mongoose.Schema({
    attributeName: {
        type: String,
        trim: true
        // unique: true,
    },
    slug: {
        type: String,
        required: true
    },
    attributeTerms: [
        {
            term: {
                type: String,
                unique: true,
                trim: true
            }
        }
    ]
})

const Attribute = mongoose.model('ATTRIBUTES', AttributeSchema);
module.exports = Attribute;
