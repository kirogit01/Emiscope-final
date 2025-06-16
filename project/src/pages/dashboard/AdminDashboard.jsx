import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiAlertCircle, FiMapPin, FiUsers, FiTrendingUp, FiTrendingDown, FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import DashboardCard from '../../components/dashboard/DashboardCard';
import EmissionsChart from '../../components/dashboard/EmissionsChart';
import FactoriesTable from '../../components/dashboard/FactoriesTable';
import MapView from '../../components/dashboard/MapView';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState('list'); // 'list' or 'map'
  
  // Mock data for charts
  const overallEmissions = [
    { month: 'Jan', co: 16, co2: 445 },
    { month: 'Feb', co: 14, co2: 435 },
    { month: 'Mar', co: 17, co2: 448 },
    { month: 'Apr', co: 15, co2: 442 },
    { month: 'May', co: 19, co2: 455 },
    { month: 'Jun', co: 12, co2: 430 },
    { month: 'Jul', co: 10, co2: 425 },
  ];
  
  const industryEmissions = [
    { industry: 'Textile', co: 18, co2: 460 },
    { industry: 'Manufacturing', co: 22, co2: 480 },
    { industry: 'Food Processing', co: 15, co2: 440 },
    { industry: 'Chemical', co: 28, co2: 510 },
    { industry: 'Electronics', co: 12, co2: 420 },
    { industry: 'Other', co: 16, co2: 450 },
  ];
  
  // Fetch factories data
  useEffect(() => {
    const fetchFactories = async () => {
      if (!currentUser) return;
      
      try {
        const factoriesRef = collection(db, 'factories');
        const q = query(factoriesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const factoriesData = [];
        querySnapshot.forEach((doc) => {
          factoriesData.push({
            id: doc.id,
            ...doc.data(),
            // Adding mock emissions data for the demo
            currentCO: Math.floor(Math.random() * 30) + 5,
            currentCO2: Math.floor(Math.random() * 200) + 350,
            status: Math.random() > 0.7 ? 'danger' : Math.random() > 0.4 ? 'warning' : 'success'
          });
        });
        
        setFactories(factoriesData);
      } catch (error) {
        console.error('Error fetching factories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFactories();
  }, [currentUser]);
  
  const filteredFactories = factories.filter(factory => 
    factory.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    factory.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    factory.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
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
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Monitoring all factories in Sri Lanka
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Last updated:</span>
              <span className="text-sm font-medium">{format(new Date(), 'MMM d, yyyy HH:mm')}</span>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard 
              title="Total Factories"
              value={factories.length}
              icon={<FiUsers />}
              footnote="Registered in system"
            />
            
            <DashboardCard 
              title="Average CO Level"
              value="18.3 ppm"
              status="warning"
              icon={<FiBarChart2 />}
              change={{ value: "+2%", isIncrease: true }}
              footnote="vs. last month"
            />
            
            <DashboardCard 
              title="Average CO2 Level"
              value="452 ppm"
              status="warning"
              icon={<FiTrendingUp />}
              change={{ value: "+1%", isIncrease: true }}
              footnote="vs. last month"
            />
            
            <DashboardCard 
              title="Alert Factories"
              value={factories.filter(f => f.status === 'danger').length}
              status="danger"
              icon={<FiAlertCircle />}
              footnote="Requiring attention"
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Emissions Trend</h2>
              <EmissionsChart data={overallEmissions} dataKeyX="month" />
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Last 7 months</span>
                <button className="text-primary-600 hover:text-primary-800">View Details</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Emissions by Industry</h2>
              <EmissionsChart data={industryEmissions} dataKeyX="industry" />
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Average values</span>
                <button className="text-primary-600 hover:text-primary-800">View Details</button>
              </div>
            </div>
          </div>
          
          {/* Factories List/Map */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Registered Factories</h2>
                
                <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Search box */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search factories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                    />
                  </div>
                  
                  {/* View toggle */}
                  <div className="flex rounded-lg overflow-hidden border border-gray-300">
                    <button
                      onClick={() => setSelectedView('list')}
                      className={`px-4 py-2 text-sm font-medium ${
                        selectedView === 'list'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      List View
                    </button>
                    <button
                      onClick={() => setSelectedView('map')}
                      className={`px-4 py-2 text-sm font-medium ${
                        selectedView === 'map'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Map View
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {selectedView === 'list' ? (
                <FactoriesTable factories={filteredFactories} />
              ) : (
                <MapView factories={filteredFactories} />
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reports</h3>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">
                      Monthly Emissions Report - {format(new Date(2023, 6-i, 1), 'MMMM yyyy')}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Generated on {format(new Date(2023, 7-i, 5), 'MMM d, yyyy')}
                    </p>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full btn btn-outline text-sm py-2">
                View All Reports
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start">
                    <div className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
                      i === 1 ? 'bg-red-500' : i === 2 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="ml-3">
                      <p className="text-gray-800">
                        {i === 1 ? 'Critical CO2 levels at' : i === 2 ? 'Warning: CO levels rising at' : 'Normal levels restored at'}{' '}
                        <span className="font-medium">Factory #{i}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(new Date().getTime() - i * 3600000), 'MMM d, HH:mm')}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full btn btn-outline text-sm py-2">
                View All Alerts
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors flex items-center">
                  <FiUsers className="mr-3" />
                  Add New Factory
                </button>
                <button className="w-full text-left px-4 py-3 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors flex items-center">
                  <FiBarChart2 className="mr-3" />
                  Generate Monthly Report
                </button>
                <button className="w-full text-left px-4 py-3 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-colors flex items-center">
                  <FiMapPin className="mr-3" />
                  Update Location Data
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                  <FiAlertCircle className="mr-3" />
                  Manage Alert Thresholds
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;