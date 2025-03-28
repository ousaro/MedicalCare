const MedicalRecord = require('../Model/MedicalRecord');



const getMedicalRecords = async (req, res) => {
   const medicalRecords = await MedicalRecord.find().sort({createdAt: -1});
   res.status(200).json(medicalRecords);
}

const getMedicalRecord = async (req, res) => {
    try {
        const medicalRecordId = req.params.id;
        const medicalRecord = await MedicalRecord.findById(medicalRecordId);
        if (!medicalRecord) {
          return res.status(404).json({ message: 'MedicalRecord not found' });
        }
    
        res.json(medicalRecord); 

      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch MedicalRecord', error });
      }
    
}

const getPatientMedicalRecord = async (req, res) => {
    try{
        const patientId = req.params.patientId;
        const medicalRecord = await MedicalRecord.findOne({ patientId: patientId });
        if (!medicalRecord) {
            return res.status(404).json({ message: 'MedicalRecord not found' });
        }
        res.json(medicalRecord);

    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

const createMedicalRecord = async (req, res) => {
    const newMedicalRecord = req.body;
    try {
        const medicalRecord = await MedicalRecord.create(newMedicalRecord);
        res.status(201).json(medicalRecord);  
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateMedicalRecord = async (req, res) => {
    const updates = req.body;
    try{
        const medicalRecordId = req.params.id;
        const medicalRecord = await MedicalRecord.findByIdAndUpdate(medicalRecordId, updates, { new: true });

        if (!medicalRecord) {
            return res.status(404).json({ message: 'MedicalRecord not found' });
        }

        res.json(medicalRecord); 
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

const deleteMedicalRecord = async (req, res) => {
    try{
        const medicalRecordId = req.params.id;
        await MedicalRecord.findByIdAndDelete(medicalRecordId);  
        res.json({ message: 'MedicalRecord deleted successfully'});   
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getMedicalRecords,
    getMedicalRecord,
    getPatientMedicalRecord,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord
}
