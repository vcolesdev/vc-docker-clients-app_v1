import AppConfig from "../config.ts";

import TestComponent from "./TestComponent/TestComponent.tsx";

import "./App.css"

function App({ config }: any) {
  return (
        <AppConfig.Provider value={config}>
            <h1>{config.name}</h1>
            <p>{config.description}</p>
            <TestComponent dbQuery="databases" />
            <TestComponent dbQuery="collections" />
        </AppConfig.Provider>
    )
}

export default App
