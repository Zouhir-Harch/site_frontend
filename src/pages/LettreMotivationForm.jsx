import React, { useState } from 'react';
import '../styles/FormPage.css';

function LettreMotivationForm({ onBack }) {
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    adresse: '',
    code_postal: '',
    ville: '',
    email: '',
    telephone: '',
    
    // Destinataire
    entreprise: '',
    destinataire_nom: '',
    destinataire_titre: 'M.',
    adresse_entreprise: '',
    
    // Poste
    poste: '',
    type_contrat: 'Stage',
    date_disponibilite: '',
    reference_annonce: '',
    
    // Lieu et date
    lieu_redaction: '',
    date_redaction: new Date().toLocaleDateString('fr-FR'),
    
    // Contenu
    objet: '',
    paragraphe_intro: '',
    paragraphe_competences: '',
    paragraphe_motivation: '',
    paragraphe_conclusion: ''
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

  // Auto-remplissage de l'objet
  const generateObjet = () => {
    if (formData.type_contrat && formData.poste) {
      const objet = `Candidature pour un ${formData.type_contrat} de ${formData.poste}`;
      setFormData(prev => ({ ...prev, objet }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Envoi des données:', formData);
      
      const response = await fetch('http://sitebackend-production-a230.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = 'Erreur lors de la génération de la lettre';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      
      if (blob.size < 1000) {
        throw new Error('Le PDF généré semble vide. Vérifiez que tous les champs sont remplis.');
      }
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lettre_motivation_${formData.nom}_${formData.prenom}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('Lettre de motivation générée avec succès !');
    } catch (err) {
      setError(err.message);
      console.error('Erreur complète:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-page lettre-form-page">
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
          <h1 className="form-title">Lettre de Motivation</h1>
          <p className="form-subtitle">Créez une lettre de motivation professionnelle et personnalisée</p>
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
            <h3 className="section-title">Vos Coordonnées</h3>
            
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
                <label htmlFor="adresse">Adresse *</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  required
                  placeholder="Numéro et rue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="code_postal">Code Postal *</label>
                <input
                  type="text"
                  id="code_postal"
                  name="code_postal"
                  value={formData.code_postal}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 60000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ville">Ville *</label>
                <input
                  type="text"
                  id="ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Oujda"
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
            </div>
          </div>

          {/* Informations Destinataire */}
          <div className="form-section">
            <h3 className="section-title">Destinataire</h3>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="entreprise">Entreprise *</label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  required
                  placeholder="Nom de l'entreprise"
                />
              </div>

              <div className="form-group">
                <label htmlFor="destinataire_titre">Titre</label>
                <select
                  id="destinataire_titre"
                  name="destinataire_titre"
                  value={formData.destinataire_titre}
                  onChange={handleChange}
                >
                  <option value="M.">M.</option>
                  <option value="Mme">Mme</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Pr.">Pr.</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="destinataire_nom">Nom du Destinataire</label>
                <input
                  type="text"
                  id="destinataire_nom"
                  name="destinataire_nom"
                  value={formData.destinataire_nom}
                  onChange={handleChange}
                  placeholder="Nom du recruteur (optionnel)"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="adresse_entreprise">Adresse de l'Entreprise</label>
                <input
                  type="text"
                  id="adresse_entreprise"
                  name="adresse_entreprise"
                  value={formData.adresse_entreprise}
                  onChange={handleChange}
                  placeholder="Adresse complète (optionnel)"
                />
              </div>
            </div>
          </div>

          {/* Informations sur le Poste */}
          <div className="form-section">
            <h3 className="section-title">Informations sur le Poste</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="type_contrat">Type de Contrat *</label>
                <select
                  id="type_contrat"
                  name="type_contrat"
                  value={formData.type_contrat}
                  onChange={handleChange}
                  required
                >
                  <option value="Stage">Stage</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Alternance">Alternance</option>
                  <option value="PFE">Projet de Fin d'Études</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="poste">Poste Visé *</label>
                <input
                  type="text"
                  id="poste"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  onBlur={generateObjet}
                  required
                  placeholder="Ex: Développeur Full-Stack"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="objet">Objet de la Lettre *</label>
                <input
                  type="text"
                  id="objet"
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Candidature pour un Stage de Développeur"
                />
              </div>

              <div className="form-group">
                <label htmlFor="reference_annonce">Référence Annonce</label>
                <input
                  type="text"
                  id="reference_annonce"
                  name="reference_annonce"
                  value={formData.reference_annonce}
                  onChange={handleChange}
                  placeholder="Ex: REF-2024-001 (optionnel)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lieu_redaction">Lieu de Rédaction *</label>
                <input
                  type="text"
                  id="lieu_redaction"
                  name="lieu_redaction"
                  value={formData.lieu_redaction}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Oujda"
                />
              </div>
            </div>
          </div>

          {/* Contenu de la Lettre */}
          <div className="form-section">
            <h3 className="section-title">Contenu de la Lettre</h3>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="paragraphe_intro">
                  Paragraphe d'Introduction *
                  <span className="help-text">Présentez-vous et expliquez pourquoi vous postulez</span>
                </label>
                <textarea
                  id="paragraphe_intro"
                  name="paragraphe_intro"
                  value={formData.paragraphe_intro}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Actuellement étudiant en [formation], je me permets de vous adresser ma candidature pour le poste de [poste]..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="paragraphe_competences">
                  Paragraphe sur vos Compétences *
                  <span className="help-text">Mettez en avant vos compétences et expériences pertinentes</span>
                </label>
                <textarea
                  id="paragraphe_competences"
                  name="paragraphe_competences"
                  value={formData.paragraphe_competences}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Au cours de ma formation, j'ai développé des compétences en..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="paragraphe_motivation">
                  Paragraphe de Motivation *
                  <span className="help-text">Expliquez votre intérêt pour l'entreprise et le poste</span>
                </label>
                <textarea
                  id="paragraphe_motivation"
                  name="paragraphe_motivation"
                  value={formData.paragraphe_motivation}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Votre entreprise m'intéresse particulièrement car..."
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="paragraphe_conclusion">
                  Paragraphe de Conclusion *
                  <span className="help-text">Terminez par votre disponibilité et une demande d'entretien</span>
                </label>
                <textarea
                  id="paragraphe_conclusion"
                  name="paragraphe_conclusion"
                  value={formData.paragraphe_conclusion}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Disponible dès [date], je serais ravi(e) de vous rencontrer lors d'un entretien pour discuter de ma candidature..."
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button lettre-submit" disabled={isLoading}>
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
                  Générer la Lettre de Motivation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LettreMotivationForm;
