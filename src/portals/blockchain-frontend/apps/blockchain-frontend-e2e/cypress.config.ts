import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

// export default defineConfig({
//   e2e: nxE2EPreset(__dirname),
// });

// const cypressJsonConfig = {
//   fileServerFolder: '.',
//   fixturesFolder: './src/fixtures',
//   video: true,
//   videosFolder: '../../dist/cypress/apps/tafi-portal-e2e/videos',
//   screenshotsFolder: '../../dist/cypress/apps/tafi-portal-e2e/screenshots',
//   chromeWebSecurity: false,
//   viewportWidth: 1920,
//   viewportHeight: 1080,
//   experimentalSessionAndOrigin: true,
//   specPattern: 'src/integration/*/*/*.js',
//   specPattern: 'src/e2e/LoginTest.cy.{js,jsx,ts,tsx}',
//   supportFile: 'src/support/e2e.ts',
// };

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    //...cypressJsonConfig,
    specPattern: [
      'src/e2e/SignUpTest.cy.ts',
      'src/e2e/LoginTest.cy.ts'
    ],
  },

});