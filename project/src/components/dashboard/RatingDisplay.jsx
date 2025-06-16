import { motion } from 'framer-motion';

const RatingDisplay = ({ rating }) => {
  // Convert rating (0-5) to appropriate colors and labels
  const getRatingInfo = (rating) => {
    if (rating >= 4.5) {
      return { color: 'text-success-500', bg: 'bg-success-100', label: 'Excellent' };
    } else if (rating >= 3.5) {
      return { color: 'text-success-500', bg: 'bg-success-100', label: 'Good' };
    } else if (rating >= 2.5) {
      return { color: 'text-warning-500', bg: 'bg-warning-100', label: 'Average' };
    } else if (rating >= 1.5) {
      return { color: 'text-warning-500', bg: 'bg-warning-100', label: 'Below Average' };
    } else {
      return { color: 'text-error-500', bg: 'bg-error-100', label: 'Poor' };
    }
  };
  
  const ratingInfo = getRatingInfo(rating);
  
  // Create an array of 5 stars
  const stars = Array(5).fill(0);
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-1">
        {stars.map((_, index) => (
          <motion.svg
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`w-6 h-6 ${
              index < Math.floor(rating) 
                ? 'text-yellow-400' 
                : index < rating 
                  ? 'text-yellow-300' // Half-filled star
                  : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
      <div className={`px-3 py-1 rounded-full ${ratingInfo.bg} ${ratingInfo.color} text-sm font-medium`}>
        {ratingInfo.label} ({rating.toFixed(1)})
      </div>
    </div>
  );
};

export default RatingDisplay;