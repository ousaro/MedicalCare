const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    medicalHistory: [
        {
            date: String,
            condition: String,
            notes: String,
        },
    ],
    medications: [
        {
            name: String,
            dosage: String,
            frequency: String,
        },
    ],
    condition: String,
    allergies: [String],
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord;