import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Disc3 } from 'lucide-react';
import AlbumCard from './AlbumCard'; // Importez le composant AlbumCard

const AlbumsSection = ({ albumsData }) => {
  const scrollRef = useRef(null);

  const scroll = direction => {
    if (scrollRef.current) {
      const scrollAmount = 320; // largeur d'une carte + margin
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const sectionStyle = {
    padding: '40px 20px',
    background:
      'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    margin: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '32px',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const titleContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const iconStyle = {
    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    padding: '12px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '8px',
    margin: 0,
  };

  const controlsStyle = {
    display: 'flex',
    gap: '12px',
  };

  const controlButtonStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const carouselContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
  };

  const carouselStyle = {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    paddingBottom: '20px',
  };

  const backgroundDecoStyle = {
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background:
      'conic-gradient(from 0deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
    borderRadius: '50%',
    animation: 'rotate 20s linear infinite',
    zIndex: 0,
  };

  return (
    <section style={sectionStyle}>
      <div style={backgroundDecoStyle}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <div style={iconStyle}>
              <Disc3 size={24} color="white" />
            </div>
            <div>
              <h2 style={titleStyle}>Albums & Collections</h2>
              <p style={subtitleStyle}>
                Explorez nos albums complets et collections spéciales
              </p>
            </div>
          </div>

          <div style={controlsStyle}>
            <button
              style={controlButtonStyle}
              onClick={() => scroll('left')}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <ChevronLeft size={20} color="white" />
            </button>
            <button
              style={controlButtonStyle}
              onClick={() => scroll('right')}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <ChevronRight size={20} color="white" />
            </button>
          </div>
        </div>

        <div style={carouselContainerStyle}>
          <div ref={scrollRef} style={carouselStyle} className="hide-scrollbar">
            {albumsData.map((album, index) => (
              <AlbumCard
                key={album.id}
                album={album}
                featured={album.featured || index === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default AlbumsSection;
