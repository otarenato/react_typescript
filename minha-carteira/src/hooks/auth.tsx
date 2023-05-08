import React, { createContext, useState, useContext } from "react";

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

interface Props {
    children?: React.ReactNode;
    }

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<Props> = ({children}) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if(email === 'ota.renato@gmail.com' && password === '123') {
            localStorage.setItem('@minha-carteira:logged', 'true');
        } else {
            alert('Usuário ou senha inválido(s)');
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };