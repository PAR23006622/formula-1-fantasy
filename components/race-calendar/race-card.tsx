import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Race } from "@/lib/types/race";

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  return (
    <Card className="overflow-hidden bg-card border hover:shadow-lg transition-shadow rounded-[25px]">
      <div className="text-base font-semibold text-purple-600 dark:text-purple-400 p-4 pb-2 text-center">
        Round {race.round}
      </div>
      <div className="relative w-full h-48 px-4">
        <div className="relative w-full h-full border border-gray-200 dark:border-gray-800 rounded-[25px] overflow-hidden">
          <Image
            src={race.flagUrl}
            alt={`${race.country} flag`}
            layout="fill"
            objectFit="cover"
            className="object-center"
            priority={race.round <= 3}
          />
        </div>
      </div>
      
      <div className="p-4 space-y-4 text-center">
        <div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-xl text-foreground">{race.country}</h3>
          </div>
          <p className="text-base text-muted-foreground line-clamp-2">{race.name}</p>
        </div>
        
        <div className="flex items-center justify-center text-base text-muted-foreground">
          <Calendar className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
          <span>{race.date}</span>
        </div>
      </div>
    </Card>
  );
}