import { copyLinkByContentScript, shareLink } from "./index";

chrome.commands.onCommand.addListener((command) => {
  console.log("command :>> ", command);

  void chrome.storage.local.get(["copy", "share"]).then((result) => {
    console.log("result :>> ", result);

    switch (command) {
      case "copy":
        void copyLinkByContentScript(result.copy ?? "");
        break;
      case "share":
        void shareLink(result.share ?? "");
        break;
    }
  });
});
