const GameFooter = () => {
  return (
    <div>
      <footer className="bg-[#0f172a] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">GameZone</h2>
            <p className="text-sm text-gray-400">
              Dive into a world of fun and competition. Play, climb the ranks,
              and become a legend!
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/games" className="hover:text-violet-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/games/allgames"
                  className="hover:text-violet-400 transition"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="/games/leaderboard"
                  className="hover:text-violet-400 transition"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/games/myprofile"
                  className="hover:text-violet-400 transition"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-violet-400 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-violet-400 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-violet-400 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-violet-400 transition">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-2">
              Get updates on new games and tournaments.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
            <button className="mt-3 w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 py-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GameZone. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default GameFooter;
