// Importing react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components
import MyComponent from "./components/Data";
import Navbar from "./components/Navbar";
import Show from "./components/Show";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MyComponent />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
