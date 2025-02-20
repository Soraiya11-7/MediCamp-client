import React, { useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRegisteredCampByEmail from '../../../hooks/useRegisteredCampByEmail';
import useAuth from '../../../hooks/useAuth';
// import { div } from 'framer-motion/client';

// import { Tooltip } from '@material-tailwind/react';
const colors = ['#166534', '#eab308', '#FFBB28', '#FF8042', '#166534', '#FFBB28'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const Analytics = () => {

    // const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [camps, loading, refetch] = useRegisteredCampByEmail(search);
    const {darkMode} = useAuth()
    // const axiosSecure = useAxiosSecure();

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    // if (loading) {
    //     return (
    //         <div className="flex items-center min-h-screen justify-center">
    //             <Skeleton count={3} height={120} width={200} />
    //         </div>
    //     );
    // }
    return (
        <>
           
            <div className='w-full'>
                <h2 className='text-2xl md:text-4xl font-bold mt-8 mb-4 text-center my-8'>Camp Fee Analytics</h2>

                { loading ? (<div className="flex items-center justify-center">
          <span className="loading loading-bars mt-10 loading-lg flex items-center justify-center dark:text-white dark:bg-white text-green-800"></span>
         
      </div>):
                camps && camps.length > 0 ? (
                    <div>
                        <p className="md:text-lg text-base mb-6  ">
                            The chart below illustrates the fees for the camps you have registered for, with camp names on the X-axis and fees in USD on the Y-axis.
                        </p>


                        <div style={{ width: '100%', height: 350 }} >
                            <ResponsiveContainer>
                                <BarChart
                                    width={600}
                                    height={350}
                                    data={camps}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 50,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"  stroke={darkMode ? "#444" : "#ddd"}/>
                                    <XAxis
                                        dataKey="campName"
                                        label={{
                                            value: 'Camp Name',
                                            position: 'bottom',
                                            offset: 0,
                                            style: { textAnchor: 'middle', fontSize: 18, fontWeight: 'bold', fill: darkMode ? "#fff" : "#000", }
                                        }}
                                        stroke={darkMode ? "#fff" : "#000"}
                                    />

                                    <YAxis label={{ value: 'Fees (in USD)', angle: -90, position: 'left', style: { textAnchor: 'middle', fontSize: 18, fontWeight: 'bold',  fill: darkMode ? "#fff" : "#000", } }}  stroke={darkMode ? "#fff" : "#000"} />
                                    <Tooltip />
                                    <Bar dataKey="campFees" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                        {camps.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                ) : (<div className="text-center text-sm sm:text-base text-gray-500 dark:text-white mt-8 w-[80%] mx-auto">
                    <p>No camps registered. Please register for a camp to view the analytics.</p>
                </div>)}
            </div>
        </>

    );
};

export default Analytics;