export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">F1 Fantasy</h3>
            <p className="text-gray-400 dark:text-gray-500">
              The ultimate Formula 1 fantasy gaming experience
            </p>
            <div className="flex space-x-4">
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/how-to-play" className="text-gray-400 dark:text-gray-500 hover:text-white">How to Play</a></li>
              <li><a href="/rules" className="text-gray-400 dark:text-gray-500 hover:text-white">Rules</a></li>
              <li><a href="/standings" className="text-gray-400 dark:text-gray-500 hover:text-white">Standings</a></li>
              <li><a href="/race-calendar" className="text-gray-400 dark:text-gray-500 hover:text-white">Race Calendar</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-400 dark:text-gray-500 hover:text-white">FAQ</a></li>
              <li><a href="/contact" className="text-gray-400 dark:text-gray-500 hover:text-white">Contact Us</a></li>
              <li><a href="/terms" className="text-gray-400 dark:text-gray-500 hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-900 mt-12 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2024 F1 Fantasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}