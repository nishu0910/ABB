import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import RegisterSuccess from './components/RegisterSuccess';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Profile from './components/Profile';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/register-success" component={RegisterSuccess} />
                    <Route path="/biding-list" component={Dashboard} />
                    <Route path="/bid-detail/:id" component={Details} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;