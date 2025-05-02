//bookingRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  bookEvent,
  cancelBooking,
  getBookings,
  getEventBookings,
  getAllEvents,
} = require('../controllers/bookingController');

router.post('/book', auth, bookEvent);
router.post('/cancel', auth, cancelBooking);
router.get('/my', auth, getBookings);
router.get('/event/:eventId', auth, getEventBookings);
router.get('/allEvents',auth,getAllEvents );
module.exports = router;

