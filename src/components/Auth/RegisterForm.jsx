import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    signup(email, password, name);
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

  const separatorContainerStyle = {
    margin: '24px 0',
    position: 'relative',
    textAlign: 'center',
  };

  const separatorLineStyle = {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '1px',
    background: 'rgba(255, 255, 255, 0.3)',
  };

  const separatorTextStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.6)',
    padding: '0 8px',
    fontSize: '14px',
    position: 'relative',
    zIndex: 1,
  };

  const socialButtonsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginTop: '24px',
  };

  const googleButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '500',
    fontFamily: 'Montserrat, sans-serif',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    maxWidth: '280px',
    width: '100%',
    fontSize: '14px',
  };

  const appleButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '500',
    fontFamily: 'Montserrat, sans-serif',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    maxWidth: '280px',
    width: '100%',
    fontSize: '14px',
  };

  const iconContainerStyle = {
    padding: '5px',
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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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
          S&apos;inscrire
        </button>
      </div>

      <div style={separatorContainerStyle}>
        <div style={separatorLineStyle}></div>
        <span style={separatorTextStyle}>ou</span>
      </div>

      <div style={socialButtonsContainerStyle}>
        <button
          style={googleButtonStyle}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <div style={iconContainerStyle}>
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          <span>S&apos;inscrire avec Google</span>
        </button>

        <button
          style={appleButtonStyle}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <div style={iconContainerStyle}>
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
              />
            </svg>
          </div>
          <span>S&apos;inscrire avec Apple</span>
        </button>
      </div>

      <p style={footerTextStyle}>
        Déjà un compte ?
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

export default RegisterForm;
