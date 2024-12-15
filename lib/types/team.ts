export interface TeamMember {
  id: string;
  name: string;
  team?: string;
  price: string;
  points: string;
}

export interface TeamState {
  drivers: TeamMember[];
  constructors: TeamMember[];
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
}