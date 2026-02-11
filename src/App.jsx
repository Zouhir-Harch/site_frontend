import React, { useState } from 'react';
import './styles/App.css';
import HomePage from './pages/HomePage';
import PageDeGardeForm from './pages/PageDeGardeForm';
import CVForm from './pages/CVForm';
import LettreMotivationForm from './pages/LettreMotivationForm';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSelect={setCurrentPage} />;
      case 'page-de-garde':
        return <PageDeGardeForm onBack={() => setCurrentPage('home')} />;
      case 'cv':
        return <CVForm onBack={() => setCurrentPage('home')} />;
      case 'lettre-motivation':
        return <LettreMotivationForm onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onSelect={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
