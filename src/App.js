import "./App.css";
import { createContext, useContext, useReducer } from "react";

const colors = ["red", "green", "blue", "black", "orange"];

function getRandomColorState() {
  const totalColors = colors.length;
  return colors[Math.floor(Math.random() * totalColors)];
}

function colorStateReducer(state) {
  const isPreviousColorBlue = state.currentColor === "blue";
  const nextColor = isPreviousColorBlue ? "green" : getRandomColorState();
  return {
    currentColor: nextColor,
    stack: [...state.stack, nextColor],
  };
}
const ColorContext = createContext(null);

function ColorContextProvider({ children }) {
  const [state, changeColor] = useReducer(colorStateReducer, {
    currentColor: "black",
    stack: ["black"],
  });
  return (
    <ColorContext.Provider value={{ state, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
}

function ColorStack() {
  const { state, changeColor } = useContext(ColorContext);
  return (
    <header className="App-header">
      <button
        style={{
          backgroundColor: state.currentColor,
          borderColor: state.currentColor,
        }}
        onClick={changeColor}
      >
        Change Color
      </button>
      <h2>Color Entries:</h2>
      <ul className="colors-list">
        {state.stack.map((entry, index) => {
          return (
            <li key={index} style={{ color: entry }}>
              {entry}
            </li>
          );
        })}
      </ul>
    </header>
  );
}

function App() {
  return (
    <main className="App">
      <ColorContextProvider>
        <ColorStack />
      </ColorContextProvider>
    </main>
  );
}

export default App;
