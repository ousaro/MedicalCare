const express = require('express');


const patientRoutes = express.Router();
const {getPatients, getPatient, createPatient, updatePatient, deletePatient} = require('../Controllers/patientController');


// Defined routes

patientRoutes.get('/', getPatients);    
patientRoutes.get('/:id', getPatient);
patientRoutes.post('/', createPatient);
patientRoutes.patch('/update/:id', updatePatient);
patientRoutes.delete('/delete/:id', deletePatient);

module.exports = patientRoutes;