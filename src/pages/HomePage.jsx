import React from 'react';
import '../styles/HomePage.css';

function HomePage({ onSelect }) {
  return (
    <div className="home-container">
      <div className="background-decoration">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="grid-overlay"></div>
      </div>
      
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Créez vos</span>
            <span className="title-highlight">Documents Professionnels</span>
          </h1>
          <p className="hero-subtitle">
            Générateur intelligent de CV et pages de garde pour vos rapports de stage
          </p>
        </div>
      </header>

      <main className="options-section">
        <div className="cards-container">
          <div className="option-card" onClick={() => onSelect('page-de-garde')}>
            <div className="card-icon-wrapper">
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="card-title">Page de Garde</h2>
            <p className="card-description">
              Générez une page de garde professionnelle pour votre rapport de stage
            </p>
            <div className="card-features">
              <span className="feature-tag">Rapport de stage</span>
              <span className="feature-tag">PFE</span>
              <span className="feature-tag">Mémoire</span>
            </div>
            <button className="card-button">
              Commencer
              <svg className="button-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="option-card" onClick={() => onSelect('cv')}>
            <div className="card-icon-wrapper cv-icon">
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="card-title">Curriculum Vitae</h2>
            <p className="card-description">
              Créez un CV moderne et professionnel qui met en valeur votre parcours
            </p>
            <div className="card-features">
              <span className="feature-tag">Design moderne</span>
              <span className="feature-tag">Format PDF</span>
              <span className="feature-tag">Personnalisable</span>
            </div>
            <button className="card-button cv-button">
              Commencer
              <svg className="button-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="option-card" onClick={() => onSelect('lettre-motivation')}>
            <div className="card-icon-wrapper lettre-icon">
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="card-title">Lettre de Motivation</h2>
            <p className="card-description">
              Générez une lettre de motivation convaincante et personnalisée
            </p>
            <div className="card-features">
              <span className="feature-tag">Professionnelle</span>
              <span className="feature-tag">Personnalisée</span>
              <span className="feature-tag">Format standard</span>
            </div>
            <button className="card-button lettre-button">
              Commencer
              <svg className="button-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
