import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";

fetch("/config.json")
    .then(response => response.json())
    .then(config => {
        console.log(`Config: ${JSON.stringify(config)}`);
        ReactDOM.createRoot(document.getElementById("root")!).render(
            <React.StrictMode>
                <App config={config} />
            </React.StrictMode>,
        )
    });
