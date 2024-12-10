import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-[250px] mx-auto" />
            <Skeleton className="h-6 w-[400px] mx-auto" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}