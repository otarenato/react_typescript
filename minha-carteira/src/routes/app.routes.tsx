import React from "react";
import { Route, Routes } from 'react-router-dom';
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard/Index";
import List from "../pages/List/Index";

const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/list/:type" Component={List} />
        </Routes>
    </Layout>
    
);

export default AppRoutes;