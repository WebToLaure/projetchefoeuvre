import { createContext } from "react";

export type Tuser = {
    user: {
        id: number,
        gender:string,
        pseudo: string,
        email: string,   
        photo: string,
        createdAt:Date,
        updatedAt:Date,
        role: string,
        topics: { id: number, title: string, destinations: string, content: string, createdAt: Date, updatedAt: Date, deletedAt: Date }[],
        commentaries: { id: number, content: string, createdAt: Date, updatedAt: Date, deletedAt: Date }[],
    },
    access_token: string
}


export interface IAuthContext {
    user: Tuser | null;
    setUser: (user:Tuser|null) => void;
}

// Pour créer un contexte, vous devez importer createContext et l’initialiser :
export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => { },

})
