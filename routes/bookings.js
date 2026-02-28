const express = require('express');
const { createBooking, getMyBookings, updateBooking, deleteBooking, getAllBookings } = require('../controllers/bookings');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// ต้อง login ก่อนถึงจะจองได้
router.get('/me', protect, getMyBookings);
router.post('/', protect, createBooking);
router.put('/:id', protect, updateBooking);
router.delete("/:id", protect, deleteBooking);
router.get("/", protect, authorize("admin"), getAllBookings);

module.exports = router;