import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'utz7fr',
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    testIsolation: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 5000
  },
});
 