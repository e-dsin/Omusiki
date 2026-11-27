import React, { useState } from 'react';

const ForgotPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = () => {
    if (!email) return;

    // Simulation d'envoi d'email
    setTimeout(() => {
      setIsEmailSent(true);
    }, 1000);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    marginTop: '16px',
  };

  const successButtonStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #10B981, #059669)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    marginTop: '16px',
  };

  const descriptionStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '24px',
    textAlign: 'center',
  };

  const successMessageStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '24px',
    textAlign: 'center',
    background: 'rgba(16, 185, 129, 0.2)',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  };

  const footerTextStyle = {
    textAlign: 'center',
    marginTop: '24px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
  };

  const linkStyle = {
    color: 'white',
    marginLeft: '8px',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
  };

  if (isEmailSent) {
    return (
      <div>
        <div style={successMessageStyle}>
          <p style={{ margin: '0 0 12px 0', fontWeight: '600' }}>
            Email envoyé avec succès !
          </p>
          <p style={{ margin: 0 }}>
            Vérifiez votre boîte de réception et suivez les instructions pour
            réinitialiser votre mot de passe.
          </p>
        </div>

        <button
          onClick={() => setIsEmailSent(false)}
          style={successButtonStyle}
          onMouseEnter={e => {
            e.target.style.background =
              'linear-gradient(to right, #059669, #047857)';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow =
              '0 10px 20px -5px rgba(16, 185, 129, 0.5)';
          }}
          onMouseLeave={e => {
            e.target.style.background =
              'linear-gradient(to right, #10B981, #059669)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Renvoyer l&apos;email
        </button>

        <p style={footerTextStyle}>
          Retour à la connexion ?
          <button
            onClick={onSwitchToLogin}
            style={linkStyle}
            onMouseEnter={e => {
              e.target.style.textDecoration = 'none';
            }}
            onMouseLeave={e => {
              e.target.style.textDecoration = 'underline';
            }}
          >
            Se connecter
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={descriptionStyle}>
        Entrez votre adresse email et nous vous enverrons un lien pour
        réinitialiser votre mot de passe.
      </p>

      <div>
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={buttonStyle}
          onMouseEnter={e => {
            e.target.style.background =
              'linear-gradient(to right, #7C3AED, #DB2777)';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow =
              '0 10px 20px -5px rgba(139, 92, 246, 0.5)';
          }}
          onMouseLeave={e => {
            e.target.style.background =
              'linear-gradient(to right, #8B5CF6, #EC4899)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Envoyer le lien de réinitialisation
        </button>
      </div>

      <p style={footerTextStyle}>
        Vous vous souvenez de votre mot de passe ?
        <button
          onClick={onSwitchToLogin}
          style={linkStyle}
          onMouseEnter={e => {
            e.target.style.textDecoration = 'none';
          }}
          onMouseLeave={e => {
            e.target.style.textDecoration = 'underline';
          }}
        >
          Se connecter
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
