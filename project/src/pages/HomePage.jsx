import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiArrowRight, FiBarChart2, FiAlertCircle, FiActivity, FiCheck } from 'react-icons/fi';
import factoryData from '../data/FactoryData'
import FactoryCard from '../components/ui/FactoryCard'

const HomePage = () => {


  const handleAddClick = () => {
    navigate('/register');
  };
  

  




  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  
  const inView1 = useInView(ref1, { once: true, threshold: 0.2 });
  const inView2 = useInView(ref2, { once: true, threshold: 0.2 });
  const inView3 = useInView(ref3, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView1) controls1.start('visible');
    if (inView2) controls2.start('visible');
    if (inView3) controls3.start('visible');
  }, [controls1, controls2, controls3, inView1, inView2, inView3]);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto md:mx-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-400 hover:text-gray-300  mb-4">
              Monitoring Emissions for a Cleaner Sri Lanka
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Real-time CO and CO2 emissions tracking for factories across Sri Lanka. Join us in the fight against climate change.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/register" className="btn  bg-green-500 text-white hover:bg-blue-600">
                Register Your Factory
              </Link>
              <Link to="/climate" className="btn bg-white text-gray-800 hover:bg-gray-300">
                Learn About Climate Change
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              ref={ref1}
              initial="hidden"
              animate={controls1}
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Why Monitor Your Factory Emissions?
            </motion.h2>
            <motion.p 
              initial="hidden"
              animate={controls1}
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-gray-600"
            >
              Our comprehensive emissions monitoring platform provides factories with valuable insights and tools to reduce their environmental impact.
            </motion.p>
          </div>
          
          <motion.div 
            ref={ref1}
            initial="hidden"
            animate={controls1}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <FiBarChart2 className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-Time Monitoring</h3>
              <p className="text-gray-600">
                Track CO and CO2 emissions in real-time with our advanced monitoring system. Get instant access to data and analytics.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-secondary-100 rounded-lg flex items-center justify-center mb-6">
                <FiAlertCircle className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Alert System</h3>
              <p className="text-gray-600">
                Receive immediate alerts when emissions exceed safe thresholds, enabling quick response to potential issues.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-accent-100 rounded-lg flex items-center justify-center mb-6">
                <FiActivity className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Analytics</h3>
              <p className="text-gray-600">
                Analyze historical data and trends to identify patterns and opportunities for emission reduction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={ref2}
            initial="hidden"
            animate={controls2}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our platform makes emissions monitoring simple and effective for factory owners across Sri Lanka.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              ref={ref2}
              initial="hidden"
              animate={controls2}
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Step 1 */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Register Your Factory</h3>
                  <p className="text-gray-600">
                    Create an account and register your factory with basic information about your facility and operations.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Monitoring Devices</h3>
                  <p className="text-gray-600">
                    Install our certified emissions monitoring devices at key points in your facility to collect accurate data.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Monitor & Analyze</h3>
                  <p className="text-gray-600">
                    Access your custom dashboard to view real-time emissions data, set up alerts, and analyze performance.
                  </p>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div variants={fadeInUp} className="flex items-start">
                <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Reduce & Improve</h3>
                  <p className="text-gray-600">
                    Use insights from our platform to implement emission reduction strategies and improve your environmental rating.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/3912956/pexels-photo-3912956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Factory monitoring dashboard" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

         {/* Factory Grid Section */}
      <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Factory Emissions Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {factoryData.map((factory, index) => (
            <FactoryCard key={index} factory={factory} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/register" className="  btn  bg-primary-600 text-white hover:bg-secondary-500">
                Add Your Factory
              </Link>
        </div>
      </div>
    </section>



      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={ref3}
            initial="hidden"
            animate={controls3}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Benefits for Your Factory</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Monitoring emissions doesn't just help the environment—it provides tangible benefits for your business.
            </p>
          </motion.div>
          
          <motion.div
            ref={ref3}
            initial="hidden"
            animate={controls3}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Benefit 1 */}
            <motion.div variants={fadeInUp} className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
              <p className="text-gray-300">
                Stay compliant with local and international environmental regulations and avoid penalties.
              </p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div variants={fadeInUp} className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cost Reduction</h3>
              <p className="text-gray-300">
                Identify inefficiencies and reduce waste, leading to lower operational costs and increased profits.
              </p>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div variants={fadeInUp} className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Brand Reputation</h3>
              <p className="text-gray-300">
                Enhance your company's image as an environmentally responsible business and attract eco-conscious customers.
              </p>
            </motion.div>
            
            {/* Benefit 4 */}
            <motion.div variants={fadeInUp} className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Edge</h3>
              <p className="text-gray-300">
                Gain a competitive advantage in the market by demonstrating your commitment to sustainability.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Monitor Your Factory Emissions?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8 text-primary-100"
          >
            Join hundreds of factories across Sri Lanka that are already benefiting from our emissions monitoring platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
          >
            <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Register Now <FiArrowRight className="ml-2" />
            </Link>
            <Link to="/about" className="btn border-2 border-white text-white hover:bg-primary-700">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;