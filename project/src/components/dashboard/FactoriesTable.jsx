import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiAlertCircle, FiAlertTriangle, FiCheck } from 'react-icons/fi';

const FactoriesTable = ({ factories }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sort factories based on current sort field and direction
  const sortedFactories = [...factories].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle null or undefined values
    if (aValue === null || aValue === undefined) aValue = '';
    if (bValue === null || bValue === undefined) bValue = '';
    
    // For string fields
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // For numeric fields
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
  
  // Function to determine status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'danger':
        return <FiAlertCircle className="text-error-500" />;
      case 'warning':
        return <FiAlertTriangle className="text-warning-500" />;
      case 'success':
        return <FiCheck className="text-success-500" />;
      default:
        return null;
    }
  };
  
  // Function to format industry name
  const formatIndustry = (industry) => {
    if (!industry) return 'N/A';
    return industry.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <div className="overflow-hidden">
      {factories.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No factories found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Factory Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    Location
                    {sortField === 'location' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('industry')}
                >
                  <div className="flex items-center">
                    Industry
                    {sortField === 'industry' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('currentCO')}
                >
                  <div className="flex items-center">
                    CO (ppm)
                    {sortField === 'currentCO' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('currentCO2')}
                >
                  <div className="flex items-center">
                    CO₂ (ppm)
                    {sortField === 'currentCO2' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center">
                    Rating
                    {sortField === 'rating' && (
                      sortDirection === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedFactories.map((factory) => (
                <tr key={factory.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{factory.name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{factory.location || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatIndustry(factory.industry)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      factory.currentCO > 25 ? 'text-error-500' : 
                      factory.currentCO > 20 ? 'text-warning-500' : 
                      'text-success-500'
                    }`}>
                      {factory.currentCO}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      factory.currentCO2 > 500 ? 'text-error-500' : 
                      factory.currentCO2 > 450 ? 'text-warning-500' : 
                      'text-success-500'
                    }`}>
                      {factory.currentCO2}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(factory.status)}
                      <span className={`ml-1.5 text-sm ${
                        factory.status === 'danger' ? 'text-error-500' : 
                        factory.status === 'warning' ? 'text-warning-500' : 
                        'text-success-500'
                      }`}>
                        {factory.status === 'danger' ? 'Critical' : 
                         factory.status === 'warning' ? 'Warning' : 'Normal'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            factory.rating >= 3 ? 'bg-success-500' : 
                            factory.rating >= 2 ? 'bg-warning-500' : 
                            'bg-error-500'
                          }`}
                          style={{ width: `${(factory.rating / 5) * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{factory.rating || 0}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-primary-600 hover:text-primary-800 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FactoriesTable;