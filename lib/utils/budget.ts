import { TeamMember } from '../types/team';
import { PriceChange } from '../types/budget';

export function calculatePriceChange(
  oldPrice: number,
  points: number,
  ownership: number
): number {
  // Base change rate
  const baseRate = 0.1;
  
  // Performance multiplier based on points
  const performanceMultiplier = points > 0 ? 1 + (points / 100) : 1 - (Math.abs(points) / 200);
  
  // Ownership multiplier (higher ownership = smaller changes)
  const ownershipDamper = Math.max(0.5, 1 - (ownership / 200));
  
  const priceChange = oldPrice * baseRate * performanceMultiplier * ownershipDamper;
  
  // Limit maximum change to ±2.0M
  return Math.max(-2.0, Math.min(2.0, priceChange));
}

export function updateTeamBudgetCap(
  currentCap: number,
  priceChanges: PriceChange[],
  teamMembers: TeamMember[]
): number {
  let capIncrease = 0;

  // Only consider positive price changes for team members
  priceChanges.forEach(change => {
    const member = teamMembers.find(m => m.id === change.id);
    if (member && change.newPrice > change.oldPrice) {
      capIncrease += (change.newPrice - change.oldPrice);
    }
  });

  return currentCap + capIncrease;
}

export function calculateTeamValue(
  teamMembers: TeamMember[],
  priceChanges: PriceChange[]
): TeamValue {
  const purchasedValue = teamMembers.reduce(
    (sum, member) => sum + parseFloat(member.price),
    0
  );

  const currentValue = teamMembers.reduce((sum, member) => {
    const latestPrice = priceChanges
      .filter(change => change.id === member.id)
      .sort((a, b) => b.timestamp - a.timestamp)[0]?.newPrice || parseFloat(member.price);
    return sum + latestPrice;
  }, 0);

  return {
    total: currentValue,
    purchased: purchasedValue,
    difference: currentValue - purchasedValue
  };
}