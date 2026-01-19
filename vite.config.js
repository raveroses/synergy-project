import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import Components from "unplugin-vue-components/vite";
import MotionResolver from "motion-v/resolver";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      dts: true,
      resolvers: [MotionResolver()],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },
});
