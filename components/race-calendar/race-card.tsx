import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Race } from "@/lib/types/race";

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  return (
    <Card className="overflow-hidden bg-card border">
      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 p-4">
        Round {race.round}
      </div>
      <div className="relative w-full h-48">
        <Image
          src={race.flagUrl}
          alt={`${race.country} flag`}
          layout="fill"
          objectFit="cover"
          className="object-center"
          priority={race.round <= 3} // Prioritize loading for first 3 races
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-1">{race.country}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{race.name}</p>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
          <span>{race.date}</span>
        </div>
      </div>
    </Card>
  );
}