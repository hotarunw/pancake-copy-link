import { type commandTextMessage } from "./types/index";

chrome.runtime.onMessage.addListener(
  (message: commandTextMessage, sender, sendResponse) => {
    switch (message.command) {
      case "copy":
        void navigator.clipboard.writeText(message.text);
        break;
    }
  },
);
