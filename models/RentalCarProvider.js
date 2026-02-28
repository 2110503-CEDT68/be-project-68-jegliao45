const mongoose = require('mongoose');

const RentalCarProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    'RentalCarProvider',
    RentalCarProviderSchema
);