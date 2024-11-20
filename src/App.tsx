import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import NovelDetails from "./pages/NovelDetails";
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<NovelDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

