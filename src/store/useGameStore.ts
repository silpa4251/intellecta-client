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

type GameStore = {
  progress: Record<string, any>;
  games: Game[];
  loading: boolean;
  selectedGame: Game | null;
  fetchGames: () => Promise<void>;
  setSelectedGame: (game: Game) => void;
  updateProgress: (data: Record<string, any>) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loading: false,
  selectedGame: null,
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

  setSelectedGame: (game: Game) => set({ selectedGame: game }),

  updateProgress: (data: Record<string, any>) =>
    set((state) => ({
      progress: { ...state.progress, ...data },
    })),
}));
