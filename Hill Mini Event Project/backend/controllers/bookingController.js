const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  const userId = req.user;
  const { eventId } = req.body;

  const event = await Event.findById(eventId);
  if (!event || event.availableSeats <= 0) {
    return res.status(400).json({ msg: 'Event full or not found' });
  }

  const existing = await Booking.findOne({ user: userId, event: eventId });
  if (existing) return res.status(400).json({ msg: 'Already booked' });

  await Booking.create({ user: userId, event: eventId });
  event.availableSeats -= 1;
  await event.save();

  res.json({ msg: 'Booking successful' });
};

exports.cancelBooking = async (req, res) => {
  const userId = req.user;
  const { eventId } = req.body;

  const booking = await Booking.findOneAndDelete({ user: userId, event: eventId });
  if (!booking) return res.status(404).json({ msg: 'Booking not found' });

  await Event.findByIdAndUpdate(eventId, { $inc: { availableSeats: 1 } });

  res.json({ msg: 'Booking cancelled' });
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user }).populate('event');
  res.json(bookings);
};

exports.getEventBookings = async (req, res) => {
  const { eventId } = req.params;
  const bookings = await Booking.find({ event: eventId }).populate('user');
  res.json(bookings);
};

exports.getAllEvents = async (req, res) => {
  const events = await Event.find({  });
  res.json(events);
};

