import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTarget, FiEye, FiBarChart2, FiUsers } from 'react-icons/fi';

const AboutPage = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  
  const inView1 = useInView(ref1, { once: true, threshold: 0.2 });
  const inView2 = useInView(ref2, { once: true, threshold: 0.2 });
  const inView3 = useInView(ref3, { once: true, threshold: 0.2 });
  
  const fadeIn = {
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
  
  return (
    <div className="pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoMonitor</h1>
            <p className="text-xl text-primary-100 mb-8">
              We're on a mission to help Sri Lankan factories reduce their environmental impact through real-time emissions monitoring.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-10">
          <svg width="500" height="500" viewBox="0 0 200 200">
            <path
              fill="currentColor"
              d="M45.3,-52.9C60.9,-40.9,76.9,-28.1,81.7,-11.7C86.5,4.7,80.1,24.7,68.1,39.7C56.1,54.7,38.5,64.8,20.2,70.3C1.9,75.8,-17.1,76.6,-34.9,69.7C-52.7,62.8,-69.4,48.2,-77.9,29.1C-86.4,10,-86.7,-13.5,-78.2,-32.2C-69.6,-50.9,-52.2,-64.7,-34.4,-75.4C-16.7,-86.1,1.3,-93.7,16.9,-87.8C32.4,-81.8,45.4,-62.4,45.3,-52.9Z"
            />
          </svg>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref1}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
            >
              <div>
                <div className="flex items-center mb-4">
                  <FiTarget className="text-primary-500 text-3xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To empower Sri Lankan factories with cutting-edge emissions monitoring technology, enabling them to reduce their environmental footprint while maintaining economic sustainability. We strive to create a cleaner, healthier environment for all Sri Lankans through data-driven environmental management.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <FiEye className="text-primary-500 text-3xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  A Sri Lanka where industrial growth and environmental protection go hand in hand. We envision a future where factories operate at maximum efficiency with minimal emissions, serving as global examples of sustainable industrial practices while contributing to the country's economic development.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex justify-center mb-12">
                <img 
                  src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Green factory concept" 
                  className="rounded-lg shadow-xl w-full max-w-2xl h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* What We Do */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref2}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                EcoMonitor provides comprehensive emissions monitoring solutions for factories across Sri Lanka, helping them track, analyze, and reduce their CO and CO₂ emissions.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={inView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <FiBarChart2 className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-Time Monitoring</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Advanced sensors to track CO and CO₂ emissions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>24/7 monitoring with instant alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Secure data transmission and storage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Historical data tracking and analysis</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={inView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-secondary-100 rounded-lg flex items-center justify-center mb-6">
                  <FiUsers className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Support</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Customized dashboards for different user roles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Technical support and maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Regular system updates and improvements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>Emissions reduction recommendations</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-lg p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Why Monitor Emissions?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Environmental Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Reduced contribution to climate change</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Improved air quality in surrounding areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Preservation of natural ecosystems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Protection of public health</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Business Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Regulatory compliance and avoided penalties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Improved operational efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Enhanced corporate reputation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-200 mr-2">•</span>
                      <span>Access to green financing and incentives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                EcoMonitor brings together experts in environmental science, technology, and business to create effective solutions for emissions monitoring.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Amal Fernando",
                  role: "Founder & CEO",
                  bio: "Environmental scientist with 15+ years of experience in air quality monitoring and climate change research.",
                  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  name: "Priya Jayawardena",
                  role: "Chief Technology Officer",
                  bio: "Software engineer specializing in IoT solutions and real-time data processing systems.",
                  image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                {
                  name: "Malik Perera",
                  role: "Head of Operations",
                  bio: "Former factory manager with deep understanding of industrial processes and operational optimization.",
                  image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow text-center overflow-hidden"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-primary-600 mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join Us in Creating a Cleaner Sri Lanka</h2>
            <p className="max-w-2xl mx-auto mb-8 text-secondary-100">
              Ready to take the next step in reducing your factory's emissions? Register today and become part of the solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/register" className="btn bg-white text-secondary-600 hover:bg-gray-100">
                Register Your Factory
              </a>
              <a href="/contact" className="btn border-2 border-white text-white hover:bg-secondary-700">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;