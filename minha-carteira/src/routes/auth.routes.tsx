import React from "react";
import { Routes, Route } from 'react-router-dom';

import SignIn from "../pages/SignIn/Index";

const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="/" Component={SignIn} />
    </Routes>
);
   
export default AuthRoutes;