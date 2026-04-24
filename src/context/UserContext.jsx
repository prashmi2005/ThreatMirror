import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [shieldCoins, setShieldCoins] = useState(() => {
    const saved = localStorage.getItem('tm-coins');
    return saved ? parseInt(saved, 10) : 1240; // Default mock balance
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('tm-profile');
    return saved ? JSON.parse(saved) : {
      name: 'Defender #3',
      role: 'Finance Associate',
      department: 'Finance',
      comfortLevel: 'Medium',
      devices: ['Laptop', 'Mobile'],
      tier: 'Sentinel',
      streak: 3
    };
  });

  useEffect(() => {
    localStorage.setItem('tm-coins', shieldCoins);
  }, [shieldCoins]);

  useEffect(() => {
    localStorage.setItem('tm-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const addCoins = (amount) => {
    setShieldCoins(prev => prev + amount);
  };

  const updateProfile = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ 
      shieldCoins, 
      addCoins, 
      userProfile, 
      updateProfile 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
