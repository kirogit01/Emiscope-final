import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiThermometer, FiCloudRain, FiWind, FiDroplet } from 'react-icons/fi';

const ClimatePage = () => {
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
      <section className="relative overflow-hidden bg-gray-900 text-white py-20">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/60 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Understanding Climate Change</h1>
            <p className="text-xl text-gray-300 mb-8">
              Learn about the global climate crisis, its causes, effects, and how we can mitigate its impacts.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* What is Climate Change */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref1}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Climate Change?</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Climate change refers to long-term shifts in temperatures and weather patterns. These changes may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas, which produces heat-trapping gases.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The Earth's average surface temperature has risen about 1.1°C since the late 19th century, with most of the warming occurring in the past 40 years. This may not seem like much, but it's causing dramatic changes in our environment and weather patterns.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Indicators of Climate Change</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FiThermometer className="text-primary-500 mt-1 mr-2" />
                      <span>Rising global temperatures</span>
                    </li>
                    <li className="flex items-start">
                      <FiCloudRain className="text-primary-500 mt-1 mr-2" />
                      <span>Changing precipitation patterns</span>
                    </li>
                    <li className="flex items-start">
                      <FiWind className="text-primary-500 mt-1 mr-2" />
                      <span>Increasing extreme weather events</span>
                    </li>
                    <li className="flex items-start">
                      <FiDroplet className="text-primary-500 mt-1 mr-2" />
                      <span>Rising sea levels</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <img 
                    src="https://images.pexels.com/photos/955656/pexels-photo-955656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Climate change effects" 
                    className="rounded-lg shadow-md h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Greenhouse Gases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref2}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Role of Greenhouse Gases</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Greenhouse gases act like a blanket around Earth, trapping energy in the atmosphere and causing it to warm. Human activities are changing the Earth's natural greenhouse effect by adding too many of these heat-trapping gases to the atmosphere.
              </p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
                <div className="bg-primary-500 text-white py-4 px-6">
                  <h3 className="text-xl font-semibold">Primary Greenhouse Gases</h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CO2 */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Carbon Dioxide (CO₂)</h4>
                      <div className="space-y-3">
                        <p>
                          <strong>Sources:</strong> Burning fossil fuels, deforestation, industrial processes
                        </p>
                        <p>
                          <strong>Impact:</strong> Primary driver of climate change
                        </p>
                        <p>
                          <strong>Atmospheric lifetime:</strong> 300-1,000 years
                        </p>
                      </div>
                    </div>
                    
                    {/* CO */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Carbon Monoxide (CO)</h4>
                      <div className="space-y-3">
                        <p>
                          <strong>Sources:</strong> Incomplete combustion of fossil fuels, wildfires
                        </p>
                        <p>
                          <strong>Impact:</strong> Indirect greenhouse effect by affecting atmospheric chemistry
                        </p>
                        <p>
                          <strong>Atmospheric lifetime:</strong> About 2 months
                        </p>
                      </div>
                    </div>
                    
                    {/* Methane */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Methane (CH₄)</h4>
                      <div className="space-y-3">
                        <p>
                          <strong>Sources:</strong> Livestock, rice cultivation, landfills, fossil fuel extraction
                        </p>
                        <p>
                          <strong>Impact:</strong> 25 times more potent than CO₂ over 100 years
                        </p>
                        <p>
                          <strong>Atmospheric lifetime:</strong> 12 years
                        </p>
                      </div>
                    </div>
                    
                    {/* Nitrous Oxide */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Nitrous Oxide (N₂O)</h4>
                      <div className="space-y-3">
                        <p>
                          <strong>Sources:</strong> Agricultural fertilizers, industrial processes
                        </p>
                        <p>
                          <strong>Impact:</strong> 298 times more potent than CO₂ over 100 years
                        </p>
                        <p>
                          <strong>Atmospheric lifetime:</strong> 114 years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 mt-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">CO and CO₂ from Factories</h3>
              <p className="text-gray-700 mb-4">
                Factories, especially those involved in manufacturing, energy production, and chemical processing, are significant contributors to both CO and CO₂ emissions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="text-lg font-medium text-primary-600 mb-2">Carbon Dioxide (CO₂)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Main product of complete combustion of fossil fuels</li>
                    <li>• Released during many industrial processes</li>
                    <li>• Primary contributor to the greenhouse effect</li>
                    <li>• Direct impact on global warming</li>
                    <li>• Concentration has increased by over 45% since pre-industrial times</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-primary-600 mb-2">Carbon Monoxide (CO)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Result of incomplete combustion</li>
                    <li>• Indicates inefficient processes</li>
                    <li>• Toxic air pollutant at high concentrations</li>
                    <li>• Indirectly contributes to climate change</li>
                    <li>• Often indicates other pollutants are also being released</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Impact and Mitigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact and Mitigation Strategies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Impacts on Sri Lanka
                  </h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      As an island nation, Sri Lanka is particularly vulnerable to climate change effects:
                    </p>
                    <ul className="space-y-2">
                      <li>• Rising sea levels threatening coastal areas</li>
                      <li>• Increased intensity of monsoons and droughts</li>
                      <li>• Threats to agriculture and food security</li>
                      <li>• Heat stress affecting human health</li>
                      <li>• Loss of biodiversity in marine and terrestrial ecosystems</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <img 
                    src="https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Climate impact in Sri Lanka" 
                    className="rounded-lg shadow-md h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Industrial Mitigation Strategies
                </h3>
                <p className="text-gray-700 mb-4">
                  Factories and industrial facilities can implement various strategies to reduce their emissions:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="font-medium text-primary-600 mb-2">Energy Efficiency</h4>
                    <p className="text-gray-700 text-sm">
                      Implement energy-efficient technologies and practices to reduce overall energy consumption.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="font-medium text-primary-600 mb-2">Clean Energy</h4>
                    <p className="text-gray-700 text-sm">
                      Switch to renewable energy sources like solar, wind, or hydropower.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="font-medium text-primary-600 mb-2">Process Optimization</h4>
                    <p className="text-gray-700 text-sm">
                      Improve manufacturing processes to reduce waste and emissions.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="font-medium text-primary-600 mb-2">Carbon Capture</h4>
                    <p className="text-gray-700 text-sm">
                      Implement technologies to capture carbon emissions before they enter the atmosphere.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="font-medium text-primary-600 mb-2">Emission Monitoring</h4>
                    <p className="text-gray-700 text-sm">
                      Regular monitoring helps identify issues and verify improvement measures.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="font-medium text-primary-600 mb-2">Staff Training</h4>
                    <p className="text-gray-700 text-sm">
                      Educate employees about emission reduction practices and sustainable operations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Join the Climate Action
                </h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  By monitoring and reducing emissions, factories in Sri Lanka can play a vital role in combating climate change while improving efficiency and reducing costs.
                </p>
                <a 
                  href="/register" 
                  className="btn btn-primary inline-block"
                >
                  Register Your Factory
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClimatePage;