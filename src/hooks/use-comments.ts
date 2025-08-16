
"use client"

import * as React from 'react';
import { comments as initialComments } from '@/lib/data';
import type { Comment } from '@/lib/types';

// This is a simple in-memory store for comments.
let commentsStore: Comment[] = initialComments;
let listeners: React.Dispatch<React.SetStateAction<Comment[]>>[] = [];

const broadcastChanges = () => {
    listeners.forEach(l => l(commentsStore));
}

export const useComments = () => {
    const [comments, setComments] = React.useState(commentsStore);

    React.useEffect(() => {
        listeners.push(setComments);
        return () => {
            listeners = listeners.filter(l => l !== setComments);
        }
    }, []);

    return {comments};
}

export const useCommentMutations = () => {
    const addComment = (newComment: Comment) => {
        commentsStore = [...commentsStore, newComment];
        broadcastChanges();
    }
    
    return { addComment };
}

export const getComments = () => {
    return commentsStore;
}
