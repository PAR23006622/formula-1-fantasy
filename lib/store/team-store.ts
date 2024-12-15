import { create } from 'zustand';
import { TeamMember, TeamState } from '@/lib/types/team';

interface TeamStore extends TeamState {
  addDriver: (driver: TeamMember) => void;
  removeDriver: (driverId: string) => void;
  addConstructor: (constructor: TeamMember) => void;
  removeConstructor: (constructorId: string) => void;
  resetTeam: () => void;
}

const INITIAL_BUDGET = 105.0;

export const useTeamStore = create<TeamStore>((set) => ({
  drivers: [],
  constructors: [],
  budget: {
    total: INITIAL_BUDGET,
    spent: 0,
    remaining: INITIAL_BUDGET,
  },
  addDriver: (driver) =>
    set((state) => {
      if (state.drivers.length >= 5) return state;
      const newSpent = state.budget.spent + parseFloat(driver.price);
      if (newSpent > state.budget.total) return state;
      
      return {
        drivers: [...state.drivers, driver],
        budget: {
          ...state.budget,
          spent: newSpent,
          remaining: state.budget.total - newSpent,
        },
      };
    }),
  removeDriver: (driverId) =>
    set((state) => {
      const driver = state.drivers.find((d) => d.id === driverId);
      if (!driver) return state;
      const newSpent = state.budget.spent - parseFloat(driver.price);
      return {
        drivers: state.drivers.filter((d) => d.id !== driverId),
        budget: {
          ...state.budget,
          spent: newSpent,
          remaining: state.budget.total - newSpent,
        },
      };
    }),
  addConstructor: (constructor) =>
    set((state) => {
      if (state.constructors.length >= 2) return state;
      const newSpent = state.budget.spent + parseFloat(constructor.price);
      if (newSpent > state.budget.total) return state;

      return {
        constructors: [...state.constructors, constructor],
        budget: {
          ...state.budget,
          spent: newSpent,
          remaining: state.budget.total - newSpent,
        },
      };
    }),
  removeConstructor: (constructorId) =>
    set((state) => {
      const constructor = state.constructors.find((c) => c.id === constructorId);
      if (!constructor) return state;
      const newSpent = state.budget.spent - parseFloat(constructor.price);
      return {
        constructors: state.constructors.filter((c) => c.id !== constructorId),
        budget: {
          ...state.budget,
          spent: newSpent,
          remaining: state.budget.total - newSpent,
        },
      };
    }),
  resetTeam: () =>
    set({
      drivers: [],
      constructors: [],
      budget: {
        total: INITIAL_BUDGET,
        spent: 0,
        remaining: INITIAL_BUDGET,
      },
    }),
}));