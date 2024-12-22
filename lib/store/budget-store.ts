import { create } from 'zustand';
import { BudgetState, PriceChange } from '../types/budget';
import { updateTeamBudgetCap } from '../utils/budget';
import { useTeamStore } from './team-store';

interface BudgetStore extends BudgetState {
  addPriceChange: (change: PriceChange) => void;
  updateBudgetCap: () => void;
  reset: () => void;
}

const INITIAL_BUDGET_CAP = 105.0;

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  initialCap: INITIAL_BUDGET_CAP,
  currentCap: INITIAL_BUDGET_CAP,
  priceChanges: [],

  addPriceChange: (change) => {
    set((state) => ({
      priceChanges: [...state.priceChanges, change]
    }));
    get().updateBudgetCap();
  },

  updateBudgetCap: () => {
    const teamMembers = [
      ...useTeamStore.getState().drivers,
      ...useTeamStore.getState().constructors
    ];

    const newCap = updateTeamBudgetCap(
      get().initialCap,
      get().priceChanges,
      teamMembers
    );

    set({ currentCap: newCap });
  },

  reset: () => {
    set({
      initialCap: INITIAL_BUDGET_CAP,
      currentCap: INITIAL_BUDGET_CAP,
      priceChanges: []
    });
  }
}));