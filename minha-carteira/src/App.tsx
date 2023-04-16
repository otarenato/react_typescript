import React from "react";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard/Index";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <Dashboard />
        </>
    );
}

export default App;