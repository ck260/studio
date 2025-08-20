
"use client"

import * as React from 'react';
import { collection, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { bugs as initialBugs } from '@/lib/data';
import type { Bug } from '@/lib/types';

// This hook now fetches and subscribes to bugs from Firestore.
export const useBugs = () => {
    const [bugs, setBugs] = React.useState<Bug[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const bugsCollectionRef = collection(db, 'bugs');
        
        // Set up a real-time listener.
        const unsubscribe = onSnapshot(bugsCollectionRef, (snapshot) => {
            const bugsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Bug));
            setBugs(bugsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching bugs: ", error);
            // If Firestore is empty, populate with initial data.
            // This is useful for first-time setup.
            console.log("Populating database with initial data...");
            const bugsCollection = collection(db, "bugs");
            initialBugs.forEach(bug => {
                const { id, ...bugData } = bug; // Firestore generates its own ID
                addDoc(bugsCollection, bugData);
            });
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return { bugs, loading };
}

// This hook provides functions to mutate bug data in Firestore.
export const useBugMutations = () => {
    const addBug = async (newBug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>) => {
        const bugsCollection = collection(db, "bugs");
        const bugWithTimestamps = {
            ...newBug,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        await addDoc(bugsCollection, bugWithTimestamps);
    };
    
    const updateBug = async (bugId: string, updates: Partial<Bug>) => {
        const bugDocRef = doc(db, 'bugs', bugId);
        const updatesWithTimestamp = {
            ...updates,
            updatedAt: new Date().toISOString(),
        }
        await updateDoc(bugDocRef, updatesWithTimestamp);
    };

    return { addBug, updateBug };
}

// getBugs is no longer needed as we fetch from Firestore.
