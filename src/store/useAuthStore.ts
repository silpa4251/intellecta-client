import {create} from "zustand";
import { User } from "../types";

interface UserState  {
    user: User | null, 
    setUser: (user: User)=> void;
    logout: ()=> void;
}

export const useAuthStore= create<UserState>((set)=> ({
    user: null,
    setUser: (user)=> set({user}),
    logout: ()=> set({user: null})
}))

