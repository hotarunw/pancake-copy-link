import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest((env) => ({
  manifest_version: 3,
  name: env.mode === "staging" ? "[INTERNAL] " : "" + "Pancake Copy Link",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"],
    },
  ],
  commands: {
    copyraw: {
      suggested_key: {
        default: "Ctrl+Shift+C",
      },
      description: "Copy as Title + URL",
    },
    copymd: {
      suggested_key: {
        default: "Ctrl+Shift+X",
      },
      description: "Copy as Markdown link",
    },
    share: {
      suggested_key: {
        default: "Ctrl+Shift+S",
      },
      description: "Share to X",
    },
  },
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  icons: {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png",
  },
  permissions: ["tabs", "clipboardWrite"],
}));
