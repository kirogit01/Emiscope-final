import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-4 flex justify-center"
        >
          <img src={logo} alt="EcoMonitor Logo" className="h-16 w-auto" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-bold text-primary-600"
        >
          EcoMonitor
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mt-4 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-gray-500"
        >
          Monitoring emissions for a cleaner Sri Lanka
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;