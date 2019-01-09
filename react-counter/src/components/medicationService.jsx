const medications = [];

export function getMedications() {
  return medications;
}

export function getMedication(id) {
  return medications.find(m => m._id === id);
}

export function saveMedication(medication) {
  let medicationInDb = medications.find(m => m._id === medication._id) || {};
  medicationInDb.name = medication.name;
  medicationInDb.dosage = medication.dosage;

  if (!medicationInDb._id) {
    medicationInDb._id = Date.now().toString();
    medications.push(medicationInDb);
  }

  return medicationInDb;
}

export function deletemedication(id) {
  let medicationInDb = medications.find(m => m._id === id);
  medications.splice(medications.indexOf(medicationInDb), 1);
  return medicationInDb;
}
