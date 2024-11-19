import React from 'react';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Discover from './pages/Discover'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Discover />
      </main>
    </div>
  );
}

export default App;