const express = require('express');
const { checkTableAvailability, createReservation, getReservations, updateReservationStatus, deleteReservation } = require('../controllers/reservationController');
const validateReservation = require('../validation/reservationValidator');

const router = express.Router();

// Define Reservation Routes
router.post('/',validateReservation, createReservation);  
router.get('/', getReservations);    
router.put('/:id', validateReservation, updateReservationStatus); 
router.delete('/:id', deleteReservation);    
router.get('/availability', checkTableAvailability); 

module.exports = router;
