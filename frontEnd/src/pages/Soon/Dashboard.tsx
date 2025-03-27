import { Users, Calendar, Activity, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, change, color }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}% from last month
        </p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Patients', value: '1,284', change: 12.5, color: 'bg-blue-500' },
    { icon: Calendar, label: 'Appointments', value: '42', change: -2.4, color: 'bg-green-500' },
    { icon: Activity, label: 'Operations', value: '8', change: 8.1, color: 'bg-purple-500' },
    { icon: DollarSign, label: 'Revenue', value: '$48,574', change: 4.75, color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={`https://source.unsplash.com/100x100/?portrait&${i}`}
                    alt="Patient"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">Patient Name {i + 1}</h3>
                    <p className="text-sm text-gray-500">Appointment: 9:00 AM</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
                  Consulting
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Doctor's Schedule</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={`https://source.unsplash.com/100x100/?doctor&${i}`}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">Dr. Smith {i + 1}</h3>
                    <p className="text-sm text-gray-500">Cardiology</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {i === 0 ? 'Available' : i === 1 ? 'In Surgery' : 'Break'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;