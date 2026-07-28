import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot-password'

  const getTitle = () => {
    switch (currentView) {
      case 'login':
        return 'Bon retour !';
      case 'register':
        return 'Créez votre compte';
      case 'forgot-password':
        return 'Mot de passe oublié ?';
      default:
        return 'Bon retour !';
    }
  };

  const renderForm = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
      case 'register':
        return <RegisterForm onSwitchToLogin={() => setCurrentView('login')} />;
      case 'forgot-password':
        return (
          <ForgotPasswordForm onSwitchToLogin={() => setCurrentView('login')} />
        );
      default:
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
    }
  };

  return <AuthLayout title={getTitle()}>{renderForm()}</AuthLayout>;
};

export default AuthPage;
