const Booking = require('../models/Booking');
const RentalCarProvider = require('../models/RentalCarProvider');

// @desc    Create booking
// @route   POST /api/v1/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {

        const { bookingDate, provider } = req.body;

        // ตรวจสอบ provider มีจริงไหม
        const providerExists = await RentalCarProvider.findById(provider);

        if (!providerExists) {
            return res.status(404).json({
                success: false,
                msg: 'Provider not found'
            });
        }

        // ตรวจสอบว่าผู้ใช้จองเกิน 3 คันหรือยัง
        const bookingCount = await Booking.countDocuments({
            user: req.user.id
        });

        if (bookingCount >= 3) {
            return res.status(400).json({
                success: false,
                msg: 'You cannot book more than 3 cars'
            });
        }

        // สร้าง booking
        const booking = await Booking.create({
            bookingDate,
            provider,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: booking
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Get current logged in user's bookings
// @route   GET /api/v1/bookings/me
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({ user: req.user.id })
            .populate('provider', 'name address telephone');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user")
    .populate("provider");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
};

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
    try {

        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                msg: 'Booking not found'
            });
        }

        // 🔥 เช็คว่าเป็นเจ้าของ booking ไหม
        if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
        }

        booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: booking
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.deleteBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  // 🔥 ตรงนี้คือหัวใจข้อ 6
  if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(401).json({ message: "Not authorized" });
    }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
};