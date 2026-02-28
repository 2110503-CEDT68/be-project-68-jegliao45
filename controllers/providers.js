const RentalCarProvider = require('../models/RentalCarProvider');

// @desc    Get all rental car providers
// @route   GET /api/v1/providers
// @access  Public
exports.getProviders = async (req, res) => {
    try {
        const providers = await RentalCarProvider.find();

        res.status(200).json({
            success: true,
            count: providers.length,
            data: providers
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Create rental car provider
// @route   POST /api/v1/providers
// @access  Private (Admin)
exports.createProvider = async (req, res) => {
    try {

        const provider = await RentalCarProvider.create(req.body);

        res.status(201).json({
            success: true,
            data: provider
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};