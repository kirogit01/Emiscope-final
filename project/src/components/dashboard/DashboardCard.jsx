import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon, status, change, footnote }) => {
  // Determine color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'danger':
        return 'text-error-500';
      case 'warning':
        return 'text-warning-500';
      case 'success':
        return 'text-success-500';
      default:
        return 'text-primary-500';
    }
  };
  
  const getStatusBg = (status) => {
    switch (status) {
      case 'danger':
        return 'bg-error-100';
      case 'warning':
        return 'bg-warning-100';
      case 'success':
        return 'bg-success-100';
      default:
        return 'bg-primary-100';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 ${getStatusBg(status)} rounded-lg flex items-center justify-center`}>
          <span className={`text-xl ${getStatusColor(status)}`}>
            {icon}
          </span>
        </div>
        
        {change && (
          <div className={`flex items-center ${change.isIncrease ? 'text-error-500' : 'text-success-500'}`}>
            {change.isIncrease ? (
              <FiTrendingUp className="mr-1" />
            ) : (
              <FiTrendingDown className="mr-1" />
            )}
            <span className="text-sm font-medium">{change.value}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className={`text-2xl font-bold ${status ? getStatusColor(status) : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
      
      {footnote && (
        <p className="text-xs text-gray-500 mt-2">{footnote}</p>
      )}
    </motion.div>
  );
};

export default DashboardCard;