import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, DollarSign, Calendar, FileText } from 'lucide-react';

const BillingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [invoice, setInvoice] = useState({
    id: 1,
    patientName: 'John Doe',
    patientId: 'PAT001',
    invoiceNumber: 'INV20240320001',
    service: 'Consultation',
    doctor: 'Dr. Michael Brown',
    amount: 150.00,
    tax: 15.00,
    discount: 0,
    total: 165.00,
    date: '2024-03-20',
    dueDate: '2024-04-20',
    status: 'Pending',
    paymentMethod: 'Credit Card',
    items: [
      {
        description: 'Initial Consultation',
        quantity: 1,
        rate: 100.00,
        amount: 100.00
      },
      {
        description: 'Blood Test',
        quantity: 1,
        rate: 50.00,
        amount: 50.00
      }
    ],
    payments: [
      {
        date: '2024-03-20',
        amount: 50.00,
        method: 'Credit Card',
        reference: 'PAY001'
      }
    ],
    notes: 'Patient insurance claim pending'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the invoice data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/billing')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Invoice Details</h1>
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
              Edit Invoice
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
                <p className="mt-1 text-gray-900">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={invoice.patientName}
                    onChange={(e) => setInvoice({ ...invoice, patientName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{invoice.patientName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                <p className="mt-1 text-gray-900">{invoice.patientId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={invoice.doctor}
                    onChange={(e) => setInvoice({ ...invoice, doctor: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{invoice.doctor}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...invoice.items];
                            newItems[index] = { ...item, description: e.target.value };
                            setInvoice({ ...invoice, items: newItems });
                          }}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="text-right py-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...invoice.items];
                            newItems[index] = {
                              ...item,
                              quantity: parseInt(e.target.value),
                              amount: parseInt(e.target.value) * item.rate
                            };
                            setInvoice({ ...invoice, items: newItems });
                          }}
                          className="w-20 text-right rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="text-right py-2">
                      ${item.rate.toFixed(2)}
                    </td>
                    <td className="text-right py-2">
                      ${item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan={3} className="text-right py-2">Subtotal</td>
                  <td className="text-right py-2">${invoice.amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right py-2">Tax</td>
                  <td className="text-right py-2">${invoice.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right py-2">Discount</td>
                  <td className="text-right py-2">${invoice.discount.toFixed(2)}</td>
                </tr>
                <tr className="font-bold">
                  <td colSpan={3} className="text-right py-2">Total</td>
                  <td className="text-right py-2">${invoice.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                {isEditing ? (
                  <select
                    value={invoice.status}
                    onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                    <option>Cancelled</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{invoice.status}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{invoice.dueDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                {isEditing ? (
                  <select
                    value={invoice.paymentMethod}
                    onChange={(e) => setInvoice({ ...invoice, paymentMethod: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option>Credit Card</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Insurance</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{invoice.paymentMethod}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <div className="space-y-4">
              {invoice.payments.map((payment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{payment.date}</span>
                    <span className="text-sm text-green-600">${payment.amount.toFixed(2)}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {payment.method} - Ref: {payment.reference}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            {isEditing ? (
              <textarea
                value={invoice.notes}
                onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{invoice.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;