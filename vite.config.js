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
  root: path.resolve(process.cwd(), 'lib', 'public'),
  publicDir: path.parse(process.cwd(), 'lib', 'public', 'assets'),
  server: {
    strictPort: true,
    port: 3000,
  },
  mode: 'development',
  base: "./",
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'lib'),
    },
  },
  build: {
    assetsDir: path.resolve(process.cwd(), 'lib', 'public', 'assets'),
    outDir: path.resolve(process.cwd(), 'dist'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(process.cwd(), 'lib', 'index.js'),
      name: getPackageNameCamelCase(),
    },
  },
});
