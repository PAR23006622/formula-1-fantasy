export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-4 sm:mt-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
              Build Your Dream F1 Team
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Compete with friends, make strategic picks, and climb the leaderboard in the ultimate F1 fantasy experience
            </p>
            <div className="space-x-3 sm:space-x-4">
              <a
                href="/how-to-play"
                className="inline-block bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                How to Play
              </a>
              <a
                href="/rules"
                className="inline-block bg-transparent border-2 border-white text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                Game Rules
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}