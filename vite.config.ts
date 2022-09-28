import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

export default defineConfig({
  root: path.resolve(__dirname, 'lib'),
  publicDir: path.resolve(process.cwd(), 'lib', 'public', 'assets'),
  server: {
    strictPort: true,
    port: 3000,
  },
  base: "/",
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'lib'),
    },
  },
  build: {
    minify: true,
    assetsDir: path.resolve(process.cwd(), 'lib', 'public', 'assets'),
    outDir: path.resolve(process.cwd(), 'dist'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib', 'index.ts'),
      name: getPackageNameCamelCase(),
    },
  },
});
