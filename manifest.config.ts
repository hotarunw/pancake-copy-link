import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version, name } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest((env) => ({
  manifest_version: 3,
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : name,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: { default_popup: "index.html" },
  commands: {
    copy: {
      suggested_key: {
        default: "Ctrl+Shift+C",
      },
      description: "copy",
    },
    share: {
      suggested_key: {
        default: "Ctrl+Shift+S",
      },
      description: "share",
    },
  },
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"],
    },
  ],
  permissions: ["tabs", "clipboardWrite", "storage"],
}));
