import { renderHook, act } from '@testing-library/react';
import { useAudio } from '@/hooks/useAudio';

// Mock HTMLAudioElement
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  load: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  currentTime: 0,
  duration: 240,
  volume: 1,
}));

describe('useAudio', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useAudio());
    
    expect(result.current.isReady).toBe(false);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.volume).toBe(70);
  });

  it('loads audio when URL is provided', () => {
    const { result } = renderHook(() => useAudio('https://example.com/song.mp3'));
    
    expect(result.current.audio).toBeDefined();
  });

  it('plays and pauses audio', async () => {
    const { result } = renderHook(() => useAudio());
    
    await act(async () => {
      await result.current.play();
    });
    
    act(() => {
      result.current.pause();
    });
    
    expect(result.current.audio?.play).toHaveBeenCalled();
    expect(result.current.audio?.pause).toHaveBeenCalled();
  });

  it('updates volume', () => {
    const { result } = renderHook(() => useAudio());
    
    act(() => {
      result.current.setVolume(50);
    });
    
    expect(result.current.volume).toBe(50);
  });
});