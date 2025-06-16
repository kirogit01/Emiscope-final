import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const allowedAdminEmail = 'kirokirojan01@gmail.com'; // ✅ Your only admin

  // ✅ Register user (block admin role)
  async function registerUser(email, password, displayName, role = 'factory_owner', factoryDetails = {}) {
    try {
      if (role === 'admin') {
        throw new Error('You cannot register as an admin.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email,
        role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      if (role === 'factory_owner' && factoryDetails) {
        await setDoc(doc(db, 'factories', user.uid), {
          ownerId: user.uid,
          name: factoryDetails.name,
          location: factoryDetails.location,
          industry: factoryDetails.industry,
          foundedYear: factoryDetails.foundedYear,
          rating: 0,
          lastEmissionReading: null,
          createdAt: serverTimestamp(),
        });
      }

      toast.success('Registration successful!');
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message);
      throw error;
    }
  }

  // ✅ Login user (admin must match allowed email)
  async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === 'admin' && user.email !== allowedAdminEmail) {
          toast.error("Unauthorized admin login attempt.");
          await signOut(auth);
          throw new Error("You are not authorized as admin.");
        }

        setUserRole(userData.role);
        setUserProfile(userData);

        toast.success(`Welcome ${userData.role === 'admin' ? 'Admin' : 'Factory Owner'}!`);
      }

      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });

      return user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message);
      throw error;
    }
  }

  async function logoutUser() {
    try {
      await signOut(auth);
      setUserRole(null);
      setUserProfile(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.message);
      throw error;
    }
  }

  async function fetchUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role);
        setUserProfile(userData);
        return userData;
      } else {
        console.error('No user document found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserRole(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userProfile,
    loading,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
