import { type commandTextMessage } from "./types/index";

// Content Script

// ServiceWorkerができないクリップボードAPI実行を引き受ける
chrome.runtime.onMessage.addListener(
  // ServiceWorkerではクリップボードAPIが使えないためContentScriptからメッセージを受信して実行
  (message: commandTextMessage, sender, sendResponse) => {
    switch (message.command) {
      case "copy":
        void navigator.clipboard.writeText(message.text);
        break;
    }
  },
);
