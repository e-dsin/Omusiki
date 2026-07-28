
import {
  formatDuration,
  formatFileSize,
  validateEmail,
  validatePassword,
  shuffleArray,
} from '@/utils/helpers';

describe('Helpers', () => {
  describe('formatDuration', () => {
    it('formats seconds to mm:ss', () => {
      expect(formatDuration(0)).toBe('0:00');
      expect(formatDuration(59)).toBe('0:59');
      expect(formatDuration(60)).toBe('1:00');
      expect(formatDuration(125)).toBe('2:05');
    });

    it('formats hours correctly', () => {
      expect(formatDuration(3600)).toBe('1:00:00');
      expect(formatDuration(3665)).toBe('1:01:05');
    });
  });

  describe('formatFileSize', () => {
    it('formats bytes to human readable size', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(1024)).toBe('1.00 KB');
      expect(formatFileSize(1048576)).toBe('1.00 MB');
      expect(formatFileSize(1073741824)).toBe('1.00 GB');
    });
  });

  describe('validateEmail', () => {
    it('validates email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('validates password requirements', () => {
      const weak = validatePassword('weak');
      expect(weak.isValid).toBe(false);
      expect(weak.errors).toContain('Le mot de passe doit contenir au moins 8 caractères');

      const strong = validatePassword('Strong123');
      expect(strong.isValid).toBe(true);
      expect(strong.errors).toHaveLength(0);
    });
  });

  describe('shuffleArray', () => {
    it('returns shuffled array with same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled).not.toBe(original); // New array instance
      expect(shuffled.sort()).toEqual(original.sort()); // Same elements
    });
  });
});