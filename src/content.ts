import { type CommandTextMessage } from "./types";
// Content Script

// ServiceWorkerができないクリップボードAPI実行を引き受ける
chrome.runtime.onMessage.addListener((message: CommandTextMessage) => {
  switch (message.command) {
    case "copy":
      void navigator.clipboard.writeText(message.text);
      break;
  }
});
