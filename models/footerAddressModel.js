const mongoose = require('mongoose');

const FooterAddressSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },

    image:{
        data: Buffer,
        contentType: String,
        required: false
    }

}, { timestamps: true });


module.exports = footerAddressModel = mongoose.model('footerAddressModel', FooterAddressSchema, 'footer address');