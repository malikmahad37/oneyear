import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface MemoryItem {
  id: string;
  type: 'photo' | 'chat' | 'voice' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
  date?: string;
}

interface MemoryContextType {
  memories: MemoryItem[];
  addMemory: (memory: MemoryItem) => void;
  removeMemory: (id: string) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<MemoryItem[]>([
    {
      id: 'chat-1',
      type: 'chat',
      url: '/memories/chat1.jpg'
    },
    {
      id: 'chat-2',
      type: 'chat',
      url: '/memories/chat2.jpg'
    },
    {
      id: 'chat-3',
      type: 'chat',
      url: '/memories/chat3.jpg'
    },
    {
      id: 'chat-4',
      type: 'chat',
      url: '/memories/chat4.jpg'
    },
    {
      id: 'chat-5',
      type: 'chat',
      url: '/memories/chat5.jpg'
    },

    {
      id: 'chat-11',
      type: 'chat',
      url: '/memories/chat11.jpg'
    },
    {
      id: 'chat-12',
      type: 'chat',
      url: '/memories/chat12.jpg'
    },
    {
      id: 'chat-13',
      type: 'chat',
      url: '/memories/chat13.jpg'
    },
    {
      id: 'chat-14',
      type: 'chat',
      url: '/memories/chat14.jpg'
    },
    {
      id: 'chat-15',
      type: 'chat',
      url: '/memories/chat15.jpg'
    },
    {
      id: 'chat-16',
      type: 'chat',
      url: '/memories/chat16.jpg'
    },
    {
      id: 'chat-17',
      type: 'chat',
      url: '/memories/chat17.jpg'
    },
    {
      id: 'chat-18',
      type: 'chat',
      url: '/memories/chat18.jpg'
    },
    {
      id: 'chat-19',
      type: 'chat',
      url: '/memories/chat19.jpg'
    },

    {
      id: 'chat-23',
      type: 'chat',
      url: '/memories/chat23.jpg'
    },

    {
      id: 'photo-new-batch3-1',
      type: 'photo',
      url: '/memories/alishba_third_batch_1.jpg',
      caption: 'Pyari si Screenshot 📸'
    },
    {
      id: 'photo-new-batch3-2',
      type: 'photo',
      url: '/memories/alishba_third_batch_2.jpg',
      caption: 'Streak 🔥'
    },
    {
      id: 'photo-new-batch2-1',
      type: 'photo',
      url: '/memories/alishba_second_batch_1.jpg',
      caption: 'Sunshine ☀️'
    },
    {
      id: 'photo-new-batch2-2',
      type: 'photo',
      url: '/memories/alishba_second_batch_2.jpg',
      caption: 'My Princess 👑'
    },
    {
      id: 'photo-new-batch2-3',
      type: 'photo',
      url: '/memories/alishba_second_batch_3.jpg',
      caption: 'Mashallah 💖'
    },
    {
      id: 'photo-new-batch2-4',
      type: 'photo',
      url: '/memories/alishba_second_batch_4.jpg',
      caption: 'Meri Jaan ❤️'
    },
    {
      id: 'photo-new-1',
      type: 'photo',
      url: '/memories/alishba_new_1.jpg',
      caption: 'My Love ❤️'
    },
    {
      id: 'photo-new-2',
      type: 'photo',
      url: '/memories/alishba_new_2.jpg',
      caption: 'So Beautiful ✨'
    },
    {
      id: 'photo-new-3',
      type: 'photo',
      url: '/memories/alishba_new_3.jpg',
      caption: 'Cutie 🥰'
    },
    {
      id: 'photo-new-4',
      type: 'photo',
      url: '/memories/alishba_new_4.jpg',
      caption: 'Gorgeous 💖'
    },
    {
      id: 'photo-1',
      type: 'photo',
      url: '/memories/alishba1.jpg',
      caption: 'Beautiful ❤️'
    },
    {
      id: 'photo-2',
      type: 'photo',
      url: '/memories/alishba2.jpg',
      caption: 'My Love 💕'
    },
    {
      id: 'photo-3',
      type: 'photo',
      url: '/memories/alishba3.jpg',
      caption: 'Cute 🥰'
    },
    {
      id: 'photo-4',
      type: 'photo',
      url: '/memories/alishba4.jpg',
      caption: 'Mashallah ✨'
    },
    {
      id: 'photo-5',
      type: 'photo',
      url: '/memories/alishba5.jpg',
      caption: 'Beautiful ❤️'
    },
    {
      id: 'photo-6',
      type: 'photo',
      url: '/memories/alishba6.jpg',
      caption: 'So Pretty ✨'
    },
    {
      id: 'photo-7',
      type: 'photo',
      url: '/memories/alishba7.jpg',
      caption: 'Gorgeous 🥰'
    },
    {
      id: 'photo-8',
      type: 'photo',
      url: '/memories/alishba8.jpg',
      caption: 'Cutie 💕'
    },
    {
      id: 'photo-9',
      type: 'photo',
      url: '/memories/chat25.jpg',
      caption: 'Lovely 💖'
    },
    {
      id: 'photo-10',
      type: 'photo',
      url: '/memories/alishba9.jpg',
      caption: 'Aww 🥺'
    },
    {
      id: 'photo-11',
      type: 'photo',
      url: '/memories/alishba10.jpg',
      caption: 'Princess 👑'
    },
    {
      id: 'photo-12',
      type: 'photo',
      url: '/memories/chat24.jpg',
      caption: 'Khoobsurat ✨'
    }
  ]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const addMemory = (memory: MemoryItem) => {
    setMemories(prev => [memory, ...prev]);
  };

  const removeMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const toggleMusic = () => {
    setIsMusicPlaying(prev => !prev);
    // Note: Actual audio playing logic will reside in a global AudioComponent
  };

  return (
    <MemoryContext.Provider value={{ memories, addMemory, removeMemory, isMusicPlaying, toggleMusic }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};
