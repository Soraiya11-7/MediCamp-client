import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaUsers, FaCampground, FaMoneyBillWave, FaUserCheck, FaUser } from "react-icons/fa";
import { Card } from 'antd';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allData = [], isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-dashboard-overview`);
      return res.data;
    },
  });

  // Handling loading and error states
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;

  const { totalCamps, totalUsers, totalRegisteredUsers, totalFees, registeredPerCamp } = allData;

  const barData = [
    { name: "Camps", value: totalCamps },
    { name: "Registered Users", value: totalRegisteredUsers },
  ];
  const barData2 = [
    { name: "total Fees", value: totalFees },
    { name: "Registered Users", value: totalRegisteredUsers },
  ];

  const COLORS = ["#166534", "#000000", "#eab308"];



  // Data for Pie and Bar Charts (Participants per Camp)
  const pieData = registeredPerCamp?.map(camp => ({
    name: camp.campName,
    value: camp.participantsCount
  })) || [];

  return (
    <div className=" w-full">
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-green-800 my-6 dark:text-white">Admin Overview</h2>

      {
         isLoading ? (<div className="flex items-center justify-center">
          <span className="loading loading-bars mt-10 loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>
         
      </div>)
          
            :
            <div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-xl bg-white border p-6 flex flex-col items-center space-y-6 rounded-lg justify-center text-center">
         <div className='flex justify-center items-center'> <FaCampground className="text-green-800 text-6xl " /></div>
          <div>
            <p className="text-gray-500 font-semibold text-lg sm:text-xl lg:text-2xl">Total Camps</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{totalCamps}</h3>
          </div>
        </Card>
        <Card className="shadow-xl bg-white border p-6 flex flex-col items-center space-y-6 rounded-lg justify-center text-center">
          <div className='flex justify-center items-center'><FaUser className="text-green-800 text-6xl " /></div>

          
          <div>
            <p className="text-gray-500 font-semibold text-lg sm:text-xl lg:text-2xl">Total Users</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{totalUsers}</h3>
          </div>
        </Card>

        <Card className="shadow-xl bg-white border p-6 flex flex-col items-center space-y-6 rounded-lg justify-center text-center">
          <div className='flex justify-center items-center'><FaUserCheck className="text-green-800 text-6xl " /></div>
          
          <div>
            <p className="text-gray-500 font-semibold text-lg sm:text-xl lg:text-2xl">Registered Users</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{totalRegisteredUsers}</h3>
          </div>
        </Card>

        <Card className="shadow-xl bg-white border p-6 flex flex-col items-center space-y-6 rounded-lg justify-center text-center">
          <div className='flex justify-center items-center'><FaMoneyBillWave className="text-green-800 text-6xl " /></div>
          
          <div>
            <p className="text-gray-500 font-semibold text-lg sm:text-xl lg:text-2xl">Total Fees</p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">${totalFees}</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg p-6 border rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Camps & Users Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" barSize={40} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg p-6 border rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">User & Payment Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={barData2} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Participants per Camp Section */}
      <div className="bg-white shadow-lg p-6 border rounded-lg mt-8">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Participants per Camp (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pieData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#166534" barSize={40} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="bg-white shadow-lg p-6 border rounded-lg mt-8">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Participants per Camp (Pie Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div> */}

            </div>
      }

     

   
    </div>
  );
};

export default Overview;
