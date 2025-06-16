import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiMapPin, FiAlertCircle, FiBriefcase, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    factoryName: '',
    factoryLocation: '',
    industry: '',
    foundedYear: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep1 = () => {
    if (!formData.displayName) return 'Name is required';
    if (!formData.email) return 'Email is required';
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.factoryName) return 'Factory name is required';
    if (!formData.factoryLocation) return 'Factory location is required';
    if (!formData.industry) return 'Industry is required';
    if (!formData.foundedYear) return 'Founded year is required';
    return null;
  };

  const handleNext = () => {
    const error = validateStep1();
    if (error) {
      setError(error);
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateStep2();
    if (error) {
      setError(error);
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      const factoryDetails = {
        name: formData.factoryName,
        location: formData.factoryLocation,
        industry: formData.industry,
        foundedYear: parseInt(formData.foundedYear),
      };
      
      await registerUser(
        formData.email, 
        formData.password, 
        formData.displayName, 
        'factory_owner', 
        factoryDetails
      );
      
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-6">
          <h2 className="text-center text-2xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-center text-primary-100">
            Register your factory for emissions monitoring
          </p>
          
          {/* Step indicator */}
          <div className="flex justify-center mt-4 px-8">
            <div className="w-full max-w-xs">
              <div className="flex items-center">
                <div className={`flex-1 h-1 ${step >= 1 ? 'bg-white' : 'bg-primary-300'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-white text-primary-600' : 'bg-primary-300 text-white'
                } font-bold text-sm`}>
                  1
                </div>
                <div className={`flex-1 h-1 ${step >= 2 ? 'bg-white' : 'bg-primary-300'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-white text-primary-600' : 'bg-primary-300 text-white'
                } font-bold text-sm`}>
                  2
                </div>
                <div className={`flex-1 h-1 ${step >= 3 ? 'bg-white' : 'bg-primary-300'}`}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-white">
                <span>Account</span>
                <span>Factory Details</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded"
            >
              <div className="flex items-center">
                <FiAlertCircle className="text-red-500 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </motion.div>
          )}
          
          <form className="space-y-6" onSubmit={step === 1 ? handleNext : handleSubmit}>
            {step === 1 ? (
              // Step 1: Account Information
              <>
                <div>
                  <label htmlFor="displayName\" className="label">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      required
                      value={formData.displayName}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full btn btn-primary"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              // Step 2: Factory Information
              <>
                <div>
                  <label htmlFor="factoryName" className="label">
                    Factory Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="factoryName"
                      name="factoryName"
                      type="text"
                      required
                      value={formData.factoryName}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Sri Lanka Manufacturing Co."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="factoryLocation" className="label">
                    Factory Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="factoryLocation"
                      name="factoryLocation"
                      type="text"
                      required
                      value={formData.factoryLocation}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Colombo, Sri Lanka"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="label">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="" disabled>Select an industry</option>
                    <option value="textile">Textile</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="food_processing">Food Processing</option>
                    <option value="chemical">Chemical</option>
                    <option value="electronics">Electronics</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="foundedYear" className="label">
                    Founded Year
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="foundedYear"
                      name="foundedYear"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      required
                      value={formData.foundedYear}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="2000"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 btn btn-primary"
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                        <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Register'}
                  </button>
                </div>
              </>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;