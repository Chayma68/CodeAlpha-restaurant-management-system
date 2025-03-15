const Reservation = require('../models/reservation');
const Joi = require('joi');
const { reservationValidationSchema } = require('../validation/reservationValidator');


const TOTAL_TABLES = 10;
const MAX_SEATS_PER_TABLE = 4;


const checkTableAvailability = async (req, res) => {
    try {
      const { reservationTime } = req.query;
      const requestedTime = new Date(reservationTime);
  
      const availableTables = [];
      const tableAvailability = {};
  
      for (let i = 1; i <= TOTAL_TABLES; i++) {
        // Find reservations for this table at the given time
        const existingReservations = await Reservation.find({
          tableNumber: i,
          reservationTime: requestedTime,
          status: { $ne: 'Cancelled' }
        });
  
        // Calculate how many seats are still available at this table
        const reservedSeats = existingReservations.reduce((total, res) => total + res.numGuests, 0);
        const availableSeats = MAX_SEATS_PER_TABLE - reservedSeats;
  
        if (availableSeats > 0) {
          availableTables.push(i);
          tableAvailability[i] = availableSeats; // Store available seats per table
        }
      }
  
      if (availableTables.length === 0) {
        return res.status(200).json({
          available: false,
          message: 'No tables available at this time.',
          availableTables: [],
          tableAvailability: {}
        });
      }
  
      res.status(200).json({
        available: true,
        message: `Tables available with free seats.`,
        availableTables,
        tableAvailability
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error checking table availability', error });
    }
  };
   
// Create a reservation
const createReservation = async (req, res) => {
    try {
      const { customerName, tableNumber, reservationTime, numGuests } = req.body;
  
      // Check if table number is valid
      if (tableNumber < 1 || tableNumber > TOTAL_TABLES) {
        return res.status(400).json({ message: `Invalid table number. Choose between 1 and ${TOTAL_TABLES}.` });
      }
  
      // Check if the requested number of guests exceeds table capacity
      if (numGuests < 1 || numGuests > MAX_SEATS_PER_TABLE) {
        return res.status(400).json({ message: `Each table can accommodate up to ${MAX_SEATS_PER_TABLE} guests.` });
      }
  
      //Check existing reservations for this table at the same time
      const existingReservations = await Reservation.find({
        tableNumber,
        reservationTime,
        status: { $ne: 'Cancelled' }
      });
  
      // Calculate total guests already reserved at this table
      const reservedSeats = existingReservations.reduce((total, res) => total + res.numGuests, 0);
  
      // If adding this reservation exceeds table capacity, reject it
      if (reservedSeats + numGuests > MAX_SEATS_PER_TABLE) {
        return res.status(400).json({ message: `Table ${tableNumber} only has ${MAX_SEATS_PER_TABLE - reservedSeats} seats available.` });
      }
  
      // Create new reservation
      const newReservation = new Reservation({ customerName, tableNumber, reservationTime, numGuests });
      await newReservation.save();
  
      res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (error) {
      res.status(500).json({ message: 'Error creating reservation', error });
    }
  };
  
// Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

// Update reservation status
const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let { status } = req.body;

    // Convert status to match enum exactly
    const validStatuses = ['Reserved', 'Completed', 'Cancelled'];
    status = validStatuses.find(s => s.toLowerCase() === status.toLowerCase());

    if (!status) {
      return res.status(400).json({ message: 'Invalid status. Use Reserved, Completed, or Cancelled.' });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation status updated', reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error });
  }
};

// Cancel a reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling reservation', error });
  }
};

module.exports = { checkTableAvailability, createReservation, getReservations, updateReservationStatus, deleteReservation };
