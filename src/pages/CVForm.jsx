import React, { useState } from 'react';
import '../styles/FormPage.css';

function CVForm({ onBack }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    titre_professionnel: '',
    email: '',
    telephone: '',
    adresse: '',
    date_naissance: '',
    profil: '',
    experiences: [{ poste: '', entreprise: '', date_debut: '', date_fin: '', description: '' }],
    formations: [{ diplome: '', etablissement: '', annee: '', mention: '' }],
    competences_techniques: [''],
    competences_linguistiques: [''],
    loisirs: ['']
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

  const handleArrayChange = (index, field, value, arrayName) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      if (typeof newArray[index] === 'object') {
        newArray[index] = { ...newArray[index], [field]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addItem = (arrayName, defaultValue) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue]
    }));
  };

  const removeItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Nettoyer les données
    const cleanedData = {
      ...formData,
      competences_techniques: formData.competences_techniques.filter(c => c.trim() !== ''),
      competences_linguistiques: formData.competences_linguistiques.filter(c => c.trim() !== ''),
      loisirs: formData.loisirs.filter(l => l.trim() !== '')
    };

    try {
      const response = await fetch('http://sitebackend-production-a230.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du CV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv_${formData.nom}_${formData.prenom}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('CV généré avec succès !');
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page cv-form-page">
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
          <h1 className="form-title">Curriculum Vitae</h1>
          <p className="form-subtitle">Créez un CV professionnel en quelques minutes</p>
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
          {/* Informations Personnelles */}
          <div className="form-section">
            <h3 className="section-title">Informations Personnelles</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nom">Nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prenom">Prénom *</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  placeholder="Votre prénom"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="titre_professionnel">Titre Professionnel *</label>
                <input
                  type="text"
                  id="titre_professionnel"
                  name="titre_professionnel"
                  value={formData.titre_professionnel}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Développeur Full-Stack"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone *</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  placeholder="+212 6XX XXX XXX"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="adresse">Adresse *</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                  placeholder="Ville, Pays"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="profil">Profil Professionnel *</label>
                <textarea
                  id="profil"
                  name="profil"
                  value={formData.profil}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Décrivez brièvement votre profil professionnel, vos objectifs et vos points forts..."
                />
              </div>
            </div>
          </div>

          {/* Expériences Professionnelles */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Expériences Professionnelles</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addItem('experiences', { poste: '', entreprise: '', date_debut: '', date_fin: '', description: '' })}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter une expérience
              </button>
            </div>

            {formData.experiences.map((exp, index) => (
              <div key={index} className="dynamic-item">
                <div className="item-header">
                  <span className="item-number">Expérience {index + 1}</span>
                  {formData.experiences.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem('experiences', index)}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Poste *</label>
                    <input
                      type="text"
                      value={exp.poste}
                      onChange={(e) => handleArrayChange(index, 'poste', e.target.value, 'experiences')}
                      required
                      placeholder="Titre du poste"
                    />
                  </div>

                  <div className="form-group">
                    <label>Entreprise *</label>
                    <input
                      type="text"
                      value={exp.entreprise}
                      onChange={(e) => handleArrayChange(index, 'entreprise', e.target.value, 'experiences')}
                      required
                      placeholder="Nom de l'entreprise"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de début *</label>
                    <input
                      type="text"
                      value={exp.date_debut}
                      onChange={(e) => handleArrayChange(index, 'date_debut', e.target.value, 'experiences')}
                      required
                      placeholder="Ex: Jan 2023"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date de fin *</label>
                    <input
                      type="text"
                      value={exp.date_fin}
                      onChange={(e) => handleArrayChange(index, 'date_fin', e.target.value, 'experiences')}
                      required
                      placeholder="Ex: Présent"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Description *</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'experiences')}
                      required
                      rows="3"
                      placeholder="Décrivez vos responsabilités et réalisations..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formation */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Formation Académique</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addItem('formations', { diplome: '', etablissement: '', annee: '', mention: '' })}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter une formation
              </button>
            </div>

            {formData.formations.map((formation, index) => (
              <div key={index} className="dynamic-item">
                <div className="item-header">
                  <span className="item-number">Formation {index + 1}</span>
                  {formData.formations.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem('formations', index)}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Diplôme *</label>
                    <input
                      type="text"
                      value={formation.diplome}
                      onChange={(e) => handleArrayChange(index, 'diplome', e.target.value, 'formations')}
                      required
                      placeholder="Ex: Master en Informatique"
                    />
                  </div>

                  <div className="form-group">
                    <label>Établissement *</label>
                    <input
                      type="text"
                      value={formation.etablissement}
                      onChange={(e) => handleArrayChange(index, 'etablissement', e.target.value, 'formations')}
                      required
                      placeholder="Nom de l'établissement"
                    />
                  </div>

                  <div className="form-group">
                    <label>Année *</label>
                    <input
                      type="text"
                      value={formation.annee}
                      onChange={(e) => handleArrayChange(index, 'annee', e.target.value, 'formations')}
                      required
                      placeholder="Ex: 2024"
                    />
                  </div>

                  <div className="form-group">
                    <label>Mention</label>
                    <input
                      type="text"
                      value={formation.mention}
                      onChange={(e) => handleArrayChange(index, 'mention', e.target.value, 'formations')}
                      placeholder="Ex: Très Bien"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compétences Techniques */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Compétences Techniques</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addItem('competences_techniques', '')}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter
              </button>
            </div>

            <div className="tags-container">
              {formData.competences_techniques.map((comp, index) => (
                <div key={index} className="tag-input">
                  <input
                    type="text"
                    value={comp}
                    onChange={(e) => handleArrayChange(index, null, e.target.value, 'competences_techniques')}
                    placeholder="Ex: Python, React, Docker..."
                  />
                  {formData.competences_techniques.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('competences_techniques', index)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compétences Linguistiques */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Compétences Linguistiques</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addItem('competences_linguistiques', '')}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter
              </button>
            </div>

            <div className="tags-container">
              {formData.competences_linguistiques.map((lang, index) => (
                <div key={index} className="tag-input">
                  <input
                    type="text"
                    value={lang}
                    onChange={(e) => handleArrayChange(index, null, e.target.value, 'competences_linguistiques')}
                    placeholder="Ex: Français - Courant"
                  />
                  {formData.competences_linguistiques.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('competences_linguistiques', index)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Loisirs */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Centres d'Intérêt (optionnel)</h3>
              <button
                type="button"
                className="add-button"
                onClick={() => addItem('loisirs', '')}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter
              </button>
            </div>

            <div className="tags-container">
              {formData.loisirs.map((loisir, index) => (
                <div key={index} className="tag-input">
                  <input
                    type="text"
                    value={loisir}
                    onChange={(e) => handleArrayChange(index, null, e.target.value, 'loisirs')}
                    placeholder="Ex: Lecture, Sport..."
                  />
                  {formData.loisirs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('loisirs', index)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button cv-submit" disabled={isLoading}>
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
                  Générer mon CV
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CVForm;
