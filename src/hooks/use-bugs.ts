
"use client"

import * as React from 'react';
import { bugs as initialBugs } from '@/lib/data';
import type { Bug } from '@/lib/types';

// This is a simple in-memory store.
// In a real app, you would use a state management library or server-side state.
let bugsStore: Bug[] = initialBugs;
let listeners: React.Dispatch<React.SetStateAction<Bug[]>>[] = [];

const broadcastChanges = () => {
    listeners.forEach(l => l(bugsStore));
}

const useBugsStore = () => {
    const setBugs = React.useCallback((updater: React.SetStateAction<Bug[]>) => {
        bugsStore = typeof updater === 'function' ? updater(bugsStore) : updater;
        broadcastChanges();
    }, []);

    return [bugsStore, setBugs] as const;
}

export const useBugs = () => {
    const [bugs, setBugs] = React.useState(bugsStore);

    React.useEffect(() => {
        listeners.push(setBugs);
        return () => {
            listeners = listeners.filter(l => l !== setBugs);
        }
    }, []);

    return {bugs};
}

export const useBugMutations = () => {
    const addBug = (newBug: Bug) => {
        bugsStore = [newBug, ...bugsStore];
        broadcastChanges();
    }
    
    const updateBug = (bugId: string, updates: Partial<Bug>) => {
        bugsStore = bugsStore.map(bug => 
            bug.id === bugId ? { ...bug, ...updates, updatedAt: new Date().toISOString() } : bug
        );
        broadcastChanges();
    };

    return { addBug, updateBug };
}

export const getBugs = () => {
    return bugsStore;
}
