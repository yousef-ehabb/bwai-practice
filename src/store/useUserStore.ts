import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '@/types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email, name) => {
        set({
          user: {
            id: 'u1',
            name,
            email,
            orders: [],
          },
          isAuthenticated: true,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      addOrder: (order) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              orders: [order, ...currentUser.orders],
            },
          });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
