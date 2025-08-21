
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string, fullName: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth = getAuth(app);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Here you could fetch additional user data from Firestore if needed
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
             // You can merge auth user with firestore user data
        }
      }
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string, fullName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    // Update profile in Firebase Auth
    await updateProfile(firebaseUser, { displayName: fullName });

    // Create a user document in Firestore
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    await setDoc(userDocRef, {
        id: firebaseUser.uid,
        name: fullName,
        email: firebaseUser.email,
        role: 'user'
    });

    // To make sure the display name is immediately available on the user object
    await firebaseUser.reload();
    setUser(auth.currentUser);

    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
