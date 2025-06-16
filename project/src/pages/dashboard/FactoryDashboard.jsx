import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiAlertCircle, FiBell, FiTrendingUp, FiTrendingDown, FiActivity } from 'react-icons/fi';
import { Line, Bar } from 'recharts';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import DashboardCard from '../../components/dashboard/DashboardCard';
import EmissionsChart from '../../components/dashboard/EmissionsChart';
import AlertsTable from '../../components/dashboard/AlertsTable';
import RatingDisplay from '../../components/dashboard/RatingDisplay';

const FactoryDashboard = () => {
  const { currentUser } = useAuth();
  const [factory, setFactory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mock data - would be replaced with real data from sensors
  const [coLevel, setCoLevel] = useState(15); // parts per million
  const [co2Level, setCo2Level] = useState(450); // parts per million
  
  // Mock data for charts
  const dailyEmissions = [
    { time: '00:00', co: 12, co2: 500 },
    { time: '03:00', co: 14, co2: 435 },
    { time: '06:00', co: 18, co2: 445 },
    { time: '09:00', co: 21, co2: 455 },
    { time: '12:00', co: 25, co2: 465 },
    { time: '15:00', co: 22, co2: 460 },
    { time: '18:00', co: 16, co2: 450 },
    { time: '21:00', co: 13, co2: 440 },
  ];
  
  const weeklyEmissions = [
    { day: 'Mon', co: 40, co2: 50 },
    { day: 'Tue', co: 35, co2: 200 },
    { day: 'Wed', co: 17, co2: 654 },
    { day: 'Thu', co: 15, co2: 442 },
    { day: 'Fri', co: 19, co2: 455 },
    { day: 'Sat', co: 12, co2: 430 },
    { day: 'Sun', co: 10, co2: 425 },
  ];
  
  const alerts = [
    { id: 1, type: 'warning', message: 'CO levels approaching threshold', timestamp: new Date(2023, 4, 10, 14, 32) },
    { id: 2, type: 'danger', message: 'CO2 levels exceeded limit', timestamp: new Date(2023, 4, 9, 9, 15) },
    { id: 3, type: 'info', message: 'System maintenance scheduled', timestamp: new Date(2023, 4, 8, 11, 45) },
    { id: 4, type: 'success', message: 'Emissions below weekly average', timestamp: new Date(2023, 4, 7, 16, 20) },
  ];
  
  const notifications = [
    { id: 1, message: 'Monthly report is available for download', read: false, timestamp: new Date(2023, 4, 10, 9, 0) },
    { id: 2, message: 'New emission reduction techniques available', read: true, timestamp: new Date(2023, 4, 9, 14, 30) },
    { id: 3, message: 'Your factory rating has improved', read: false, timestamp: new Date(2023, 4, 7, 10, 15) },
  ];
  
  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random fluctuations in CO and CO2 levels
      setCoLevel(prev => {
        const newValue = prev + (Math.random() * 2 - 1);
        return Math.max(5, Math.min(40, newValue));
      });
      
      setCo2Level(prev => {
        const newValue = prev + (Math.random() * 10 - 5);
        return Math.max(350, Math.min(600, newValue));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch factory data
  useEffect(() => {
    const fetchFactoryData = async () => {
      if (!currentUser) return;
      
      try {
        const factoryDoc = await getDoc(doc(db, 'factories', currentUser.uid));
        
        if (factoryDoc.exists()) {
          setFactory(factoryDoc.data());
        } else {
          console.error('No factory document found for this user');
        }
      } catch (error) {
        console.error('Error fetching factory data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFactoryData();
  }, [currentUser]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  const coStatus = coLevel > 25 ? 'danger' : coLevel > 20 ? 'warning' : 'success';
  const co2Status = co2Level > 500 ? 'danger' : co2Level > 450 ? 'warning' : 'success';
  
  return (
    <div className="pt-20 pb-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {factory?.name || 'Your Factory'} Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                {factory?.location || 'Location'} • {factory?.industry?.replace('_', ' ') || 'Industry'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <RatingDisplay rating={factory?.rating || 0} />
            </div>
          </div>

          {/* Current Emissions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="Current CO Level"
              value={`${coLevel.toFixed(1)} ppm`}
              status={coStatus}
              icon={<FiActivity />}
              change={{ value: "+3%", isIncrease: true }}
              footnote="vs. last hour"
            />
            
            <DashboardCard 
              title="Current CO2 Level"
              value={`${co2Level.toFixed(0)} ppm`}
              status={co2Status}
              icon={<FiBarChart2 />}
              change={{ value: "-1%", isIncrease: false }}
              footnote="vs. last hour"
            />
            
            <DashboardCard 
              title="Daily Average CO"
              value="17.2 ppm"
              status="warning"
              icon={<FiTrendingUp />}
              change={{ value: "+5%", isIncrease: true }}
              footnote="vs. yesterday"
            />
            
            <DashboardCard 
              title="Daily Average CO2"
              value="445 ppm"
              status="warning"
              icon={<FiTrendingDown />}
              change={{ value: "-2%", isIncrease: false }}
              footnote="vs. yesterday"
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Emissions</h2>
              <EmissionsChart data={dailyEmissions} dataKeyX="time" />
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Updated: {format(new Date(), 'MMM d, yyyy HH:mm')}</span>
                <button className="text-primary-600 hover:text-primary-800">View Details</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Trend</h2>
              <EmissionsChart data={weeklyEmissions} dataKeyX="day" />
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Last 7 days</span>
                <button className="text-primary-600 hover:text-primary-800">View Details</button>
              </div>
            </div>
          </div>
          
          {/* Recent Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
              </div>
              <div className="p-6">
                <AlertsTable alerts={alerts} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {notifications.map(notification => (
                    <li 
                      key={notification.id} 
                      className={`p-4 rounded-lg ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'
                      }`}
                    >
                      <div className="flex items-start">
                        <FiBell className={`mr-3 mt-0.5 ${notification.read ? 'text-gray-400' : 'text-blue-500'}`} />
                        <div>
                          <p className={`${notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(notification.timestamp, 'MMM d, yyyy HH:mm')}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-sm text-primary-600 hover:text-primary-800 w-full text-center">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FactoryDashboard;