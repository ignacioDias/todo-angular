import { DOCUMENT, Service, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

type ThemePreference = Theme | 'system';

const STORAGE_KEY = 'todo-theme';

@Service()
export class ThemeStore {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document.defaultView;
  private readonly darkQuery = this.window?.matchMedia?.('(prefers-color-scheme: dark)') ?? null;

  private readonly systemPrefersDark = signal(this.darkQuery?.matches ?? false);
  private readonly preference = signal<ThemePreference>(this.readPreference());

  readonly theme = computed<Theme>(() => {
    const preference = this.preference();
    if (preference === 'system') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return preference;
  });

  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    this.darkQuery?.addEventListener('change', (event) => {
      this.systemPrefersDark.set(event.matches);
    });

    effect(() => {
      const theme = this.theme();
      this.document.documentElement.dataset['theme'] = theme;
      this.persistPreference(this.preference());
    });
  }

  toggle(): void {
    this.preference.set(this.isDark() ? 'light' : 'dark');
  }

  private readPreference(): ThemePreference {
    try {
      const stored = this.window?.localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch {
      return 'system';
    }
  }

  private persistPreference(preference: ThemePreference): void {
    try {
      if (preference === 'system') {
        this.window?.localStorage.removeItem(STORAGE_KEY);
      } else {
        this.window?.localStorage.setItem(STORAGE_KEY, preference);
      }
    } catch {
      // Storage can be unavailable (private browsing, blocked cookies, etc.).
    }
  }
}
