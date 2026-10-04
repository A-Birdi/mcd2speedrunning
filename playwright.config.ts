import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {
    baseURL: 'http://127.0.0.1:4173/mcd2speedrunning/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome'], viewport: {width: 1440, height: 900}}},
    {name: 'firefox', use: {...devices['Desktop Firefox'], viewport: {width: 1440, height: 900}}},
    {name: 'touch-reduced-motion', use: {...devices['Pixel 7'], viewport: {width: 390, height: 844}, reducedMotion: 'reduce'}},
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173/mcd2speedrunning/',
    reuseExistingServer: false,
  },
});
