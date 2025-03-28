const express = require('express');


const medicalRecordRoutes = express.Router();
const {getMedicalRecords, getMedicalRecord,getPatientMedicalRecord, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord} = require('../Controllers/medicalRecordController');


// Defined routes

medicalRecordRoutes.get('/', getMedicalRecords);    
medicalRecordRoutes.get('/:id', getMedicalRecord);
medicalRecordRoutes.get('/patient/:patientId', getPatientMedicalRecord);
medicalRecordRoutes.post('/', createMedicalRecord);
medicalRecordRoutes.patch('/update/:id', updateMedicalRecord);
medicalRecordRoutes.delete('/delete/:id', deleteMedicalRecord);

module.exports = medicalRecordRoutes;