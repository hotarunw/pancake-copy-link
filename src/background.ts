import {
  generateMarkdownLink,
  generateRawLink,
  generateXShareUrl,
} from "./generateLink";
// ServiceWorker

// ServiceWorkerでコマンドショートカットにイベントハンドラをバインドする
// ServiceWorkerではクリップボードAPIが使えないため、クリップボードに書き込む代わりにContentScriptにメッセージ送信して実行させる
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab?.title == null || tab.url == null) return;

    const title = tab.title;
    const url = tab.url;
    const id = tab.id ?? chrome.tabs.TAB_ID_NONE;

    let text = "";
    switch (command) {
      case "copyraw":
        text = generateRawLink(title, url);
        void chrome.tabs.sendMessage(id, { command: "copy", text });
        break;

      case "copymd":
        text = generateMarkdownLink(title, url);
        void chrome.tabs.sendMessage(id, { command: "copy", text });
        break;

      case "share":
        text = generateXShareUrl(title, url);
        void chrome.tabs.create({ url: text });
        break;
    }
  });
});
