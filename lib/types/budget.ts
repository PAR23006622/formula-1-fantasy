export interface PriceChange {
  id: string;
  oldPrice: number;
  newPrice: number;
  timestamp: number;
}

export interface BudgetState {
  initialCap: number;
  currentCap: number;
  priceChanges: PriceChange[];
}

export interface TeamValue {
  total: number;
  purchased: number;
  difference: number;
}