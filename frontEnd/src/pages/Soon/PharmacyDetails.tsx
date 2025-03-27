import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Package, AlertTriangle, History } from 'lucide-react';

const PharmacyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [medication, setMedication] = useState({
    id: 1,
    name: 'Amoxicillin',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic',
    manufacturer: 'PharmaCorp',
    stock: 500,
    unit: 'tablets',
    batchNumber: 'BAT123456',
    expiryDate: '2025-12-31',
    location: 'Storage A, Shelf 3',
    minimumStock: 100,
    reorderPoint: 200,
    supplier: {
      name: 'PharmaCorp',
      contact: '+1 234 567 890',
      email: 'orders@pharmacorp.com'
    },
    pricePerUnit: 2.50,
    status: 'In Stock',
    transactions: [
      {
        date: '2024-03-15',
        type: 'Received',
        quantity: 1000,
        batchNumber: 'BAT123456'
      },
      {
        date: '2024-03-16',
        type: 'Dispensed',
        quantity: 500,
        prescribedBy: 'Dr. Smith'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the medication data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/pharmacy')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Medication Details</h1>
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Details
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Medication Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) => setMedication({ ...medication, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={medication.category}
                    onChange={(e) => setMedication({ ...medication, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                {isEditing ? (
                  <textarea
                    value={medication.description}
                    onChange={(e) => setMedication({ ...medication, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.description}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={medication.manufacturer}
                    onChange={(e) => setMedication({ ...medication, manufacturer: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.manufacturer}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Inventory Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Stock</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={medication.stock}
                    onChange={(e) => setMedication({ ...medication, stock: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.stock} {medication.unit}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={medication.batchNumber}
                    onChange={(e) => setMedication({ ...medication, batchNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.batchNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={medication.expiryDate}
                    onChange={(e) => setMedication({ ...medication, expiryDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.expiryDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={medication.location}
                    onChange={(e) => setMedication({ ...medication, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{medication.location}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <div className="space-y-4">
              {medication.transactions.map((transaction, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg">
                  <History className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <div className="font-medium">{transaction.type}</div>
                    <div className="text-sm text-gray-500">
                      Date: {transaction.date} | Quantity: {transaction.quantity}
                    </div>
                    {transaction.prescribedBy && (
                      <div className="text-sm text-gray-500">
                        Prescribed by: {transaction.prescribedBy}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Current Stock</span>
                  <span className="text-sm text-gray-500">{medication.stock} {medication.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(medication.stock / 1000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Minimum Stock: {medication.minimumStock}</span>
                <span>Reorder Point: {medication.reorderPoint}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Supplier Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
                <p className="mt-1 text-gray-900">{medication.supplier.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <p className="mt-1 text-gray-900">{medication.supplier.contact}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{medication.supplier.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    value={medication.pricePerUnit}
                    onChange={(e) => setMedication({ ...medication, pricePerUnit: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">${medication.pricePerUnit.toFixed(2)}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Value</label>
                <p className="mt-1 text-gray-900">
                  ${(medication.stock * medication.pricePerUnit).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetails;