// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2025-07-15",
   devtools: { enabled: true },
   telemetry: false,
   ssr: false,
   css: ["~/assets/css/main.css"],
   vite: {
      optimizeDeps: {
         include: ["@tauri-apps/api/webviewWindow", "@tauri-apps/api/window", "@tauri-apps/plugin-dialog", "@vue/devtools-core", "@vue/devtools-kit"],
      },
      // Better support for Tauri CLI output
      clearScreen: false,
      // Enable environment variables
      // Additional environment variables can be found at
      // https://v2.tauri.app/reference/environment-variables/
      envPrefix: ["VITE_", "TAURI_"],
      server: {
         // Tauri requires a consistent port
         strictPort: true,
      },
   },
   // Avoids error [unhandledRejection] EMFILE: too many open files, watch
   ignore: ["**/src-tauri/**"],
   hooks: {
      "vite:extendConfig"(config) {
         const rollupInput = config.build?.rollupOptions?.input;

         if (!rollupInput || typeof rollupInput === "string" || Array.isArray(rollupInput)) {
            return;
         }

         const firstInput = Object.values(rollupInput).find((value) => typeof value === "string");

         if (!firstInput) {
            return;
         }

         // Nuxt 4.4.5 can crash in dev if a merged Vite config keeps an object input
         // but drops the expected `entry` or `server` key. Normalize it defensively.
         if (!rollupInput.entry) {
            rollupInput.entry = firstInput;
         }

         if (!rollupInput.server) {
            rollupInput.server = firstInput;
         }
      },
   },
});
