import { render, screen, fireEvent } from '@testing-library/react';
import { SongRow } from '@/components/Common/SongRow';
import { Song } from '@/types';

describe('SongRow', () => {
  const mockSong: Song = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
    duration: 240,
    genre: 'Test Genre',
  };

  const mockOnPlay = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders song information correctly', () => {
    render(<SongRow song={mockSong} onPlay={mockOnPlay} isPlaying={false} />);
    
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('4:00')).toBeInTheDocument();
  });

  it('shows pause icon when song is playing', () => {
    render(<SongRow song={mockSong} onPlay={mockOnPlay} isPlaying={true} />);
    
    const pauseIcon = screen.getByTestId('pause-icon');
    expect(pauseIcon).toBeInTheDocument();
  });

  it('calls onPlay when clicked', () => {
    render(<SongRow song={mockSong} onPlay={mockOnPlay} isPlaying={false} />);
    
    const row = screen.getByRole('button');
    fireEvent.click(row);
    
    expect(mockOnPlay).toHaveBeenCalledWith(mockSong);
  });
});