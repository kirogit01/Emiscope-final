import { useState, useEffect } from 'react';

const MapView = ({ factories }) => {
  // In a real implementation, this would use a mapping library like Leaflet or Google Maps
  // For this demo, we'll create a simplified representation
  
  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Sri Lanka Map"
          className="w-full h-full object-cover opacity-30"
        />
        
        {/* This would be replaced with actual map markers in a real implementation */}
        {factories.map((factory, index) => {
          // Generate pseudo-random positions for the demo
          const hash = factory.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const left = (hash % 70) + 15; // 15-85%
          const top = (hash % 60) + 20; // 20-80%
          
          const statusColor = 
            factory.status === 'danger' ? 'bg-error-500' : 
            factory.status === 'warning' ? 'bg-warning-500' : 
            'bg-success-500';
          
          return (
            <div 
              key={factory.id} 
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className={`w-4 h-4 ${statusColor} rounded-full animate-pulse shadow-lg`} />
              <div className="absolute left-1/2 transform -translate-x-1/2 top-6 bg-white px-2 py-1 rounded shadow-md whitespace-nowrap text-xs font-medium">
                {factory.name}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-semibold mb-2">Map Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success-500 rounded-full mr-2"></div>
            <span className="text-xs">Normal Emissions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning-500 rounded-full mr-2"></div>
            <span className="text-xs">Warning Level</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-error-500 rounded-full mr-2"></div>
            <span className="text-xs">Critical Level</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md text-xs text-gray-500">
        Note: This is a simplified map representation
      </div>
    </div>
  );
};

export default MapView;