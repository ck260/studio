
"use client"

import * as React from 'react';
import { bugs as initialBugs } from '@/lib/data';
import type { Bug } from '@/lib/types';

// This is a simple in-memory store.
// In a real app, you would use a state management library or server-side state.
let bugsStore: Bug[] = initialBugs;
let listeners: React.Dispatch<React.SetStateAction<Bug[]>>[] = [];

const useBugsStore = () => {
    const setBugs = React.useCallback((updater: React.SetStateAction<Bug[]>) => {
        bugsStore = typeof updater === 'function' ? updater(bugsStore) : updater;
        listeners.forEach(l => l(bugsStore));
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

    const addBug = (newBug: Bug) => {
        bugsStore = [newBug, ...bugsStore];
        listeners.forEach(l => l(bugsStore));
    }

    return {bugs, addBug};
}

export const getBugs = () => {
    return bugsStore;
}
