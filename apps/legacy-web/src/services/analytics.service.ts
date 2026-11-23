import { Song, SubscriptionType } from '../types';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  private queue: AnalyticsEvent[] = [];
  private isOnline = navigator.onLine;

  constructor() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  track(event: AnalyticsEvent): void {
    if (!this.isOnline) {
      this.queue.push(event);
      return;
    }

    this.sendEvent(event);
  }

  trackSongPlay(song: Song): void {
    this.track({
      category: 'Music',
      action: 'Play',
      label: `${song.artist} - ${song.title}`,
      value: song.id,
    });
  }

  trackSearch(query: string, resultsCount: number): void {
    this.track({
      category: 'Search',
      action: 'Query',
      label: query,
      value: resultsCount,
    });
  }

  trackSubscription(plan: SubscriptionType): void {
    this.track({
      category: 'Subscription',
      action: 'Change',
      label: plan,
    });
  }

  trackError(error: Error, context?: string): void {
    this.track({
      category: 'Error',
      action: error.name,
      label: context || error.message,
    });
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // In production, send to analytics service
      console.log('Analytics event:', event);

      // Example: Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        });
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  private async flushQueue(): Promise<void> {
    const events = [...this.queue];
    this.queue = [];

    for (const event of events) {
      await this.sendEvent(event);
    }
  }
}

export const analyticsService = new AnalyticsService();
