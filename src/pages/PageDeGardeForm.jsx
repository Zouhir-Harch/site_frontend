import React, { useState } from 'react';
import '../styles/FormPage.css';

function PageDeGardeForm({ onBack }) {
  const [formData, setFormData] = useState({
    annee_universitaire: '',
    type_rapport: 'Stage de perfectionnement',
    titre_stage: '',
    entreprise: '',
    etudiant_nom: '',
    etudiant_prenom: '',
    filiere: '',
    encadrant_entreprise: '',
    encadrant_academique: '',
    date_debut: '',
    date_fin: '',
    etablissement: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://sitebackend-production-a230.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `page_de_garde_${formData.etudiant_nom}_${formData.etudiant_prenom}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Afficher un message de succès
      alert('Page de garde générée avec succès !');
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-background">
        <div className="form-blob form-blob-1"></div>
        <div className="form-blob form-blob-2"></div>
      </div>

      <div className="form-container">
        <button className="back-button" onClick={onBack}>
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour
        </button>

        <div className="form-header">
          <h1 className="form-title">Page de Garde</h1>
          <p className="form-subtitle">Remplissez les informations pour générer votre page de garde</p>
        </div>

        {error && (
          <div className="error-message">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="document-form">
          <div className="form-section">
            <h3 className="section-title">Informations Générales</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="etablissement">Établissement *</label>
                <input
                  type="text"
                  id="etablissement"
                  name="etablissement"
                  value={formData.etablissement}
                  onChange={handleChange}
                  required
                  placeholder="Ex: École Nationale des Sciences Appliquées"
                />
              </div>

              <div className="form-group">
                <label htmlFor="annee_universitaire">Année Universitaire *</label>
                <input
                  type="text"
                  id="annee_universitaire"
                  name="annee_universitaire"
                  value={formData.annee_universitaire}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 2024-2025"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="type_rapport">Type de Rapport *</label>
                <select
                  id="type_rapport"
                  name="type_rapport"
                  value={formData.type_rapport}
                  onChange={handleChange}
                  required
                >
                  <option value="Stage d'initiation">Stage d'initiation</option>
                  <option value="Stage de perfectionnement">Stage de perfectionnement</option>
                  <option value="Projet de Fin d'Études">Projet de Fin d'Études (PFE)</option>
                  <option value="Stage de fin d'études">Stage de fin d'études</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Détails du Stage</h3>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="titre_stage">Titre du Stage *</label>
                <input
                  type="text"
                  id="titre_stage"
                  name="titre_stage"
                  value={formData.titre_stage}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Développement d'une application web de gestion"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="entreprise">Entreprise d'Accueil *</label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  required
                  placeholder="Ex: TechCorp Solutions"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date_debut">Date de Début *</label>
                <input
                  type="date"
                  id="date_debut"
                  name="date_debut"
                  value={formData.date_debut}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date_fin">Date de Fin *</label>
                <input
                  type="date"
                  id="date_fin"
                  name="date_fin"
                  value={formData.date_fin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Informations Étudiant</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="etudiant_nom">Nom *</label>
                <input
                  type="text"
                  id="etudiant_nom"
                  name="etudiant_nom"
                  value={formData.etudiant_nom}
                  onChange={handleChange}
                  required
                  placeholder="Nom de famille"
                />
              </div>

              <div className="form-group">
                <label htmlFor="etudiant_prenom">Prénom *</label>
                <input
                  type="text"
                  id="etudiant_prenom"
                  name="etudiant_prenom"
                  value={formData.etudiant_prenom}
                  onChange={handleChange}
                  required
                  placeholder="Prénom"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="filiere">Filière *</label>
                <input
                  type="text"
                  id="filiere"
                  name="filiere"
                  value={formData.filiere}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Génie Informatique"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Encadrement</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="encadrant_academique">Encadrant Académique *</label>
                <input
                  type="text"
                  id="encadrant_academique"
                  name="encadrant_academique"
                  value={formData.encadrant_academique}
                  onChange={handleChange}
                  required
                  placeholder="Prof. Nom Prénom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="encadrant_entreprise">Encadrant Entreprise *</label>
                <input
                  type="text"
                  id="encadrant_entreprise"
                  name="encadrant_entreprise"
                  value={formData.encadrant_entreprise}
                  onChange={handleChange}
                  required
                  placeholder="M./Mme. Nom Prénom"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Génération en cours...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Générer la Page de Garde
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PageDeGardeForm;
