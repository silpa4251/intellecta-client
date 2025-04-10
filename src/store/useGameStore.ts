import { create } from "zustand";
import axios from "axios";

type Game = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailImg: string;
  difficulty: string;
  createdAt: Date;
};

interface LeaderboardEntry {
  userId: string;
  bestScore: null;
  totalTimePlayed: number;
  gamesPlayed: number;
  totalScore: number;
  lastPlayedGame: string;
  lastPlayedDate: Date | null;
  user: {
    name: string;
    profilePic: string;
  };
}

type GameStore = {
  progress: Record<string, any>;
  games: Game[];
  showPlayNow: boolean;
  setShowPlayNow:(val: boolean)=>void;
  loading: boolean;
  leaderboard: LeaderboardEntry[] | null;
  fetchLeaderboard: () => Promise<void>;
  fetchGames: () => Promise<void>;
  updateProgress: (data: Record<string, any>) => void;
  submitGameSession: ({
    userId,
    gameSlug,
    score,
    timeTaken,
  }: {
    userId: string;
    gameSlug: string;
    score: number;
    timeTaken: number;
  }) => Promise<void>;
};

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loading: false,
  showPlayNow:false,
  setShowPlayNow:(val)=> {
    set({showPlayNow:val })
  },
  progress: {},
  leaderboard: null,

  fetchGames: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("http://localhost:5002/api/games/allgames");
      set({ games: res.data.games || [], loading: false });
    } catch (err) {
      console.error("Failed to fetch games:", err);
      set({ loading: false });
    }
  },

  fetchLeaderboard: async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/games/users/leaderboard");
      set({ leaderboard: res.data.leaderboard });
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  },

  updateProgress: (data: Record<string, any>) =>
    set((state) => ({
      progress: { ...state.progress, ...data },
    })),

  submitGameSession: async ({ userId, gameSlug, score, timeTaken }) => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/games/game-session",
        {
          userId,
          gameSlug,
          score,
          timeTaken,
          completed: true,
        },
        { withCredentials: true }
      );
      console.log("Game session submitted:", res.data);
    } catch (err) {
      console.error("Failed to submit game session:", err);
    }
  },
}));
