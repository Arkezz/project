import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import NovelDetails from "./pages/NovelDetails";
import Footer from "./components/Footer";
import Forum from "./pages/Forum";
import ThreadDetails from "./pages/ThreadDetails";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NovelEdit from "./pages/NovelEdit";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/reading-list" element={<NovelDetails />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/thread" element={<ThreadDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/novel/edit" element={<NovelEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(var(--color-surface))",
              border: "1px solid hsl(var(--color-primary) / 0.1)",
              color: "hsl(var(--color-text))",
            },
            className: "novel-toast",
          }}
          closeButton
          richColors
        />
      </div>
    </Router>
  );
}

export default App;

