import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(() => {
        const savedUser  = localStorage.getItem('user');
        return savedUser  ? JSON.parse(savedUser ) : null;
    });

    const [users, setUsers]= useState(()=>{
        const savedUsers  = localStorage.getItem('users');
        return savedUsers  ? JSON.parse(savedUsers) : [];
    })

    const register = (firstname, lastname="", email, password) => {
        return new Promise((resolve)=>{
            const newUser  = { firstname, lastname, email, password };
            setUsers((prevUsers)=>{
                const newUsers = [...prevUsers, newUser];
                localStorage.setItem('users', JSON.stringify(newUsers));
                return newUsers;
            });
            resolve();
        })
    };

    const login = (email, password) => {
        return new Promise((resolve,reject)=>{
            const savedUsers  = JSON.parse(localStorage.getItem('users'));
            if(!savedUsers){
                reject();
            }
            const userfound = savedUsers.find(savedUser=>savedUser.email === email && savedUser.password === password);
            if(userfound){
                setUser(()=>{
                    localStorage.setItem('user', JSON.stringify(userfound));
                    return userfound;
                });
                resolve(userfound);
            }
            reject();
        })
      
    };

    const logout = () => {
        return new Promise((resolve)=>{
            setUser (null);
            localStorage.removeItem('user');
            resolve();
        });
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);