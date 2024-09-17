/**
 * バックスラッシュエスケープできる文字をエスケープする
 * バックスラッシュエスケープできる文字一覧 Daring Fireball: Markdown Syntax Documentation https://daringfireball.net/projects/markdown/syntax#backslash
 */
const escapeMarkdownSpecialChars = (str: string): string => {
  return str
    .replaceAll("\\", "\\\\") // エスケープで付けたバックスラッシュをさらにエスケープするバグを避けるため バックスラッシュは最初にエスケープする
    .replaceAll("`", "\\`")
    .replaceAll("*", "\\*")
    .replaceAll("_", "\\_")
    .replaceAll("{", "\\{")
    .replaceAll("}", "\\}")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll("#", "\\#")
    .replaceAll("+", "\\+")
    .replaceAll("-", "\\-")
    .replaceAll(".", "\\.")
    .replaceAll("!", "\\!");
};

export const generateRawLink = (title: string, url: string): string => {
  return `${title} ${url}`;
};

export const generateMarkdownLink = (title: string, url: string): string => {
  return `[${escapeMarkdownSpecialChars(title)}](${url})`;
};

export const generateXShareUrl = (title: string, url: string): string => {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
};
