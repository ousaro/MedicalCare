const express = require('express');


const appointmentRoutes = express.Router();
const {getAppointments, getAppointment,getPatientAppointments, createAppointment, updateAppointment, deleteAppointment} = require('../Controllers/appointmentController');


// Defined routes

appointmentRoutes.get('/', getAppointments);    
appointmentRoutes.get('/:id', getAppointment);
appointmentRoutes.get('/patient/:id', getPatientAppointments);
appointmentRoutes.post('/', createAppointment);
appointmentRoutes.patch('/update/:id', updateAppointment);
appointmentRoutes.delete('/delete/:id', deleteAppointment);

module.exports = appointmentRoutes;