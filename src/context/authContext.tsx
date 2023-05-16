import { createContext } from "react";
import { TTop } from "../components/topicsCards/topicsCards";
import { TCom } from "../components/Comments/commentaries";

export type TUser = {
    user: {
        id: number,
        gender: string,
        pseudo: string,
        email: string,
        photo: string,
        createdAt: Date,
        updatedAt: Date,
        role: string,
        topics: { id: number, continentId: string, title: string, destinations: string, content: string, createdAt: Date, updatedAt: Date, deletedAt: Date }[],
        commentaries: { id: number, topicId: number,  content: string, createdAt: Date, updatedAt: Date, deletedAt: Date }[],
    },
    access_token: string
}


export interface IAuthContext {
    user: TUser | null;
    setUser: (user: TUser | null) => void;
}

// Pour créer un contexte, vous devez importer createContext et l’initialiser :
export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => { },

})
