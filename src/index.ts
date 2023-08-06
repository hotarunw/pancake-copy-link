export const copyLinkMethods = ["raw", "markdown"];
export const shareLinkMethods = ["twitter"];

export type CopyLinkMethod = (typeof copyLinkMethods)[number];
export type ShareLinkMethod = (typeof shareLinkMethods)[number];

const generateRawCopyLink = (title: string, url: string): string => {
  return `${title} ${url}`;
};

const generateMarkdownCopyLink = (title: string, url: string): string => {
  const escapeChar = (str: string): string => {
    return str
      .replaceAll("*", "\\*")
      .replaceAll("_", "\\_")
      .replaceAll("\\", "\\\\")
      .replaceAll("`", "\\`")
      .replaceAll("#", "\\#")
      .replaceAll("+", "\\+")
      .replaceAll("-", "\\-")
      .replaceAll(".", "\\.")
      .replaceAll("!", "\\!")
      .replaceAll("{", "\\{")
      .replaceAll("}", "\\}")
      .replaceAll("[", "\\[")
      .replaceAll("]", "\\]")
      .replaceAll("(", "\\(")
      .replaceAll(")", "\\)");
  };
  return `[${escapeChar(title)}](${url})`;
};

const generateTwitterShareLink = (title: string, url: string): string => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;
};

export const generateCopyLink = new Map<
  CopyLinkMethod,
  (title: string, url: string) => string
>([
  ["raw", generateRawCopyLink],
  ["markdown", generateMarkdownCopyLink],
]);

export const generateShareLink = new Map<
  ShareLinkMethod,
  (title: string, url: string) => string
>([["twitter", generateTwitterShareLink]]);

export const copyLink = async (type: CopyLinkMethod): Promise<void> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab == null) {
    return;
  }

  const title = tab.title ?? "";
  const url = tab.url ?? "";
  const f = generateCopyLink.get(type);
  if (f == null) {
    return;
  }
  const result = f(title, url);
  console.log("result :>> ", result);
  void navigator.clipboard.writeText(result);
};

export const shareLink = async (type: ShareLinkMethod): Promise<void> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab == null) {
    return;
  }

  const title = tab.title ?? "";
  const url = tab.url ?? "";
  const f = generateShareLink.get(type);
  if (f == null) {
    return;
  }
  const result = f(title, url);
  console.log("result :>> ", result);
  void chrome.tabs.create({ url: result });
};

export const copyLinkByContentScript = async (
  type: CopyLinkMethod,
): Promise<void> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab == null) {
    return;
  }

  const title = tab.title ?? "";
  const url = tab.url ?? "";
  const id = tab.id ?? chrome.tabs.TAB_ID_NONE;
  const f = generateCopyLink.get(type);
  if (f == null) {
    return;
  }
  const result = f(title, url);
  console.log("result :>> ", result);
  void chrome.tabs.sendMessage(id, { command: "copy", text: result });
};
