import {
  generateMarkdownLink,
  generateRawLink,
  generateXShareUrl,
} from "./generateLink";

// FIXME: コードが短いのでコンポーネント分割などしていない

function App() {
  const handleTitleAndUrlButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.title == null || tab.url == null) return;
      const text = generateRawLink(tab.title, tab.url);
      void navigator.clipboard.writeText(text);
    });
  };

  const handleMarkdownButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.title == null || tab.url == null) return;
      const text = generateMarkdownLink(tab.title, tab.url);
      void navigator.clipboard.writeText(text);
    });
  };

  const handleXButtonClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab.title == null || tab.url == null) return;
      const text = generateXShareUrl(tab.title, tab.url);
      void chrome.tabs.create({ url: text });
    });
  };

  return (
    <>
      <div className="w-max border border-gray-200 bg-white text-base font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <button
          aria-current="true"
          onClick={handleTitleAndUrlButtonClick}
          type="button"
          className="flex w-full cursor-pointer items-center border-b border-gray-200 px-4 py-2 text-left font-medium hover:bg-gray-100 rtl:text-right dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span className="i-mdi-text me-2.5 h-6 w-6"></span>
          Copy as Title + URL
        </button>

        <button
          type="button"
          onClick={handleMarkdownButtonClick}
          className="flex w-full cursor-pointer items-center border-b border-gray-200 px-4 py-2 text-left font-medium hover:bg-gray-100 rtl:text-right dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span className="i-mdi-markdown me-2.5 h-6 w-6"></span>
          Copy as Markdown
        </button>

        <button
          type="button"
          onClick={handleXButtonClick}
          className="flex w-full cursor-pointer items-center border-b border-gray-200 bg-[#1da1f2] px-4 py-2 text-left font-medium text-white hover:bg-[#1da1f2]/90 rtl:text-right dark:border-gray-600 dark:hover:text-white"
        >
          <span className="i-mdi-twitter me-2.5 h-6 w-6"></span>
          Share to X
        </button>
      </div>
    </>
  );
}

export default App;
