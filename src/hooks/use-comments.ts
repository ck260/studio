
"use client"

import * as React from 'react';
import { collection, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { comments as initialComments } from '@/lib/data';
import type { Comment } from '@/lib/types';


// This hook now fetches and subscribes to comments from Firestore for a specific bug.
export const useComments = (bugId: string) => {
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!bugId) {
            setLoading(false);
            return;
        };

        const commentsCollectionRef = collection(db, 'comments');
        const q = query(commentsCollectionRef, where('bugId', '==', bugId));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Comment));
            setComments(commentsData.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
            setLoading(false);

            // One-time check to populate initial comments if none exist
            if (snapshot.empty) {
                 console.log("Populating database with initial comments...");
                 initialComments.forEach(comment => {
                    const { id, ...commentData } = comment;
                    addDoc(collection(db, "comments"), commentData);
                });
            }

        }, (error) => {
            console.error("Error fetching comments: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [bugId]);

    return { comments, loading };
}

// This hook provides functions to add comments to Firestore.
export const useCommentMutations = () => {
    const addComment = async (newComment: Omit<Comment, 'id' | 'createdAt'>) => {
       const commentsCollection = collection(db, "comments");
       const commentWithTimestamp = {
           ...newComment,
           createdAt: new Date().toISOString(),
       }
       await addDoc(commentsCollection, commentWithTimestamp);
    }
    
    return { addComment };
}
