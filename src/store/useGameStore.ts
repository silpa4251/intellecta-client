import { create } from "zustand";
import axios from "axios";

type Game = {
  _id:string;
  name: string;
  slug: string;
  description: string;
  thumbnailImg: string;
  difficulty: string;
  createdAt: Date;
};

interface LeaderboardEntry {
  userId: string
  bestScore:  null,
  totalTimePlayed: number,
  gamesPlayed: number,
  totalScore:number,
  lastPlayedGame: string,
  lastPlayedDate: Date | null
  user: {
    name:string,
    profilePic:string
  }
}

type GameStore = {
  progress: Record<string, any>;
  games: Game[];
  loading:boolean;
  updateProgress: (data: Record<string, any>) => void;
  leaderboard:LeaderboardEntry[] | null;
  fetchLeaderboard: () => Promise<void>;
  fetchGames:()=> Promise<void>;

};

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loading: false,
  progress: {},

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

  leaderboard:null,
  fetchLeaderboard: async()=> {
    const res = await axios.get("http://localhost:5002/api/games/users/leaderboard")
    set({leaderboard: res.data.leaderboard})
  },

  updateProgress: (data: Record<string, any>) =>
    set((state) => ({
      progress: { ...state.progress, ...data },
    })),
}));
