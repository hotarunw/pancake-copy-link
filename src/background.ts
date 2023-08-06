import { copyLinkByContentScript, shareLink } from "./index";

// ServiceWorker
// ショートカット
chrome.commands.onCommand.addListener((command) => {
  console.log("command :>> ", command);

  void chrome.storage.local.get(["copy", "share"]).then((result) => {
    console.log("result :>> ", result);

    switch (command) {
      case "copy":
        // ServiceWorkerではクリップボードAPIが使えないためContentScriptにメッセージ送信して実行
        void copyLinkByContentScript(result.copy ?? "");
        break;
      case "share":
        void shareLink(result.share ?? "");
        break;
    }
  });
});
