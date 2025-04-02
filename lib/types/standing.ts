export interface Standing {
  id: string;
  name: string;
  price: string;
  priceChange: string;
}

export interface DriverStanding extends Standing {}

export interface ConstructorStanding extends Standing {} 