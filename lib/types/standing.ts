export interface Standing {
  id: string;
  name: string;
  price: string;
  priceChange: string;
}

export interface DriverStanding extends Standing {
  team: string;
}

export interface ConstructorStanding extends Standing {
  team?: never;
} 