import { format } from 'date-fns';
import { FiAlertCircle, FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi';

const AlertsTable = ({ alerts }) => {
  // Function to determine alert icon and color
  const getAlertTypeInfo = (type) => {
    switch (type) {
      case 'danger':
        return {
          icon: <FiAlertCircle className="h-5 w-5" />,
          color: 'text-error-500',
          bg: 'bg-error-50',
          border: 'border-error-200'
        };
      case 'warning':
        return {
          icon: <FiAlertTriangle className="h-5 w-5" />,
          color: 'text-warning-500',
          bg: 'bg-warning-50',
          border: 'border-warning-200'
        };
      case 'info':
        return {
          icon: <FiInfo className="h-5 w-5" />,
          color: 'text-secondary-500',
          bg: 'bg-secondary-50',
          border: 'border-secondary-200'
        };
      case 'success':
        return {
          icon: <FiCheckCircle className="h-5 w-5" />,
          color: 'text-success-500',
          bg: 'bg-success-50',
          border: 'border-success-200'
        };
      default:
        return {
          icon: <FiInfo className="h-5 w-5" />,
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          border: 'border-gray-200'
        };
    }
  };
  
  return (
    <div className="overflow-hidden">
      {alerts.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No alerts found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => {
                const typeInfo = getAlertTypeInfo(alert.type);
                
                return (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.bg} ${typeInfo.color}`}>
                        <span className="mr-1">{typeInfo.icon}</span>
                        <span className="capitalize">{alert.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{alert.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {format(alert.timestamp, 'MMM d, HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary-600 hover:text-primary-800 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        Dismiss
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlertsTable;