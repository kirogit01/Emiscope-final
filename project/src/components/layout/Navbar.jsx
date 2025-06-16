import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser, userRole, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/climate', label: 'Climate Change' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Eco Monitor Logo" className="h-10 w-auto sm:h-12 md:h-14" />


          <span className={`ml-2 font-heading font-bold text-xl ${scrolled ? 'text-primary-800' : 'text-white'}`}>
            EmiScope
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
              } ${location.pathname === link.path ? 'border-b-2 border-primary-500' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {currentUser ? (
            <div className="relative">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className={`font-medium transition-colors ${
                    scrolled ? 'text-primary-600 hover:text-primary-800' : 'text-primary-200 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  className="relative"
                  aria-label="Notifications"
                >
                  <FiBell 
                    className={`h-6 w-6 ${
                      scrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    2
                  </span>
                </button>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center focus:outline-none"
                  aria-expanded={showDropdown}
                  aria-label="User menu"
                >
                  <div 
                    className={`w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white border-2 ${
                      scrolled ? 'border-primary-500' : 'border-white'
                    }`}
                  >
                    <FiUser className="h-5 w-5" />
                  </div>
                </button>
              </div>

              {/* User dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {currentUser.displayName || currentUser.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate capitalize">
                        {userRole?.replace('_', ' ') || 'User'}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`font-medium transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary text-sm py-2 px-4"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <FiMenu className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 font-medium ${
                    location.pathname === link.path
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-2 font-medium text-primary-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 font-medium text-red-600"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="pt-2 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block py-2 font-medium text-gray-700 hover:text-primary-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;