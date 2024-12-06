import { useState, useEffect } from 'react';

const DRAFT_KEY = 'thread_draft';

interface ThreadDraft {
  title: string;
  content: string;
  tags: string[];
  lastSaved?: number;
}

export function useThreadDraft() {
  const saveDraft = (draft: ThreadDraft) => {
    const draftWithTimestamp = {
      ...draft,
      lastSaved: Date.now(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftWithTimestamp));
  };

  const loadDraft = (): ThreadDraft | null => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (!saved) return null;

    try {
      const draft = JSON.parse(saved) as ThreadDraft;
      const hoursSinceLastSave = (Date.now() - (draft.lastSaved || 0)) / (1000 * 60 * 60);
      
      // Clear drafts older than 24 hours
      if (hoursSinceLastSave > 24) {
        clearDraft();
        return null;
      }
      
      return draft;
    } catch {
      return null;
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  return { saveDraft, loadDraft, clearDraft };
}