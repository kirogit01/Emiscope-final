import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const EmissionsChart = ({ data, dataKeyX }) => {
  // Custom tooltip to display both CO and CO2 values
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-primary-500 rounded-full mr-1"></span>
            CO: {payload[0].value} ppm
          </p>
          <p className="text-sm">
            <span className="inline-block w-3 h-3 bg-secondary-500 rounded-full mr-1"></span>
            CO<sub>2</sub>: {payload[1].value} ppm
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey={dataKeyX}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            label={{ 
              value: 'CO (ppm)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#2E7D32', fontSize: 12 } 
            }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            label={{ 
              value: 'CO₂ (ppm)', 
              angle: 90, 
              position: 'insideRight',
              style: { fill: '#1565C0', fontSize: 12 } 
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="co" 
            name="CO" 
            fill="#2E7D32" 
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Line 
            yAxisId="right"
            type="monotone"
            dataKey="co2" 
            name="CO₂"
            stroke="#1565C0"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsChart;