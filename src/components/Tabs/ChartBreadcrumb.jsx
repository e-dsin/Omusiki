import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

const ChartBreadcrumb = ({ chart, onBack }) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 40px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fontSize: '14px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    textDecoration: 'none',
  };

  const currentPageStyle = {
    color: 'white',
    fontWeight: '600',
  };

  const separatorStyle = {
    color: 'rgba(255,255,255,0.5)',
  };

  const getCategoryLabel = category => {
    switch (category) {
      case 'country':
        return 'Pays';
      case 'region':
        return 'Région';
      case 'world':
        return 'Monde';
      default:
        return 'Charts';
    }
  };

  return (
    <div style={containerStyle}>
      <span
        style={linkStyle}
        onClick={onBack}
        onMouseEnter={e => (e.target.style.color = 'white')}
        onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.7)')}
      >
        <Home size={16} />
        Accueil
      </span>

      <ChevronRight size={16} style={separatorStyle} />

      <span style={linkStyle}>
        📊 Charts {getCategoryLabel(chart.category)}
      </span>

      <ChevronRight size={16} style={separatorStyle} />

      <span style={currentPageStyle}>{chart.title}</span>
    </div>
  );
};

export default ChartBreadcrumb;
