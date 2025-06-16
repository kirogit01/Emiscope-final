import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const colorMap = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  red: 'bg-red-500',
};

const FactoryCard = ({ factory }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{factory.name}</h3>
        <div className={`w-4 h-4 rounded-full ${colorMap[factory.certificate]}`} title={factory.certificate}></div>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-yellow-500 text-lg">
          {'★'.repeat(factory.rating)}{'☆'.repeat(5 - factory.rating)}
        </span>
        <span className="ml-2 text-sm text-gray-600">({factory.rating}/5)</span>
      </div>

      <button 
        onClick={() => setExpanded(prev => !prev)}
        className="text-primary-600 font-medium flex items-center space-x-1 hover:underline"
      >
        <span>{expanded ? 'Hide Details' : 'More Details'}</span>
        {expanded ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {expanded && (
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>CO Level:</strong> {factory.coLevel} ppm</p>
          <p><strong>CO₂ Level:</strong> {factory.co2Level} ppm</p>
          <p><strong>Last Inspection:</strong> {factory.lastInspection}</p>
        </div>
      )}
    </motion.div>
  );
};

export default FactoryCard;
