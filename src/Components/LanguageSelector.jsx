import { useEffect, useState } from "react";

const LanguageSelector = () => {
  const [widgetReady, setWidgetReady] = useState(false);
  useEffect(() => {
    const checkWidget = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        setWidgetReady(true);
        clearInterval(interval);
      }
    };

    const interval = setInterval(checkWidget, 200);

    return () => clearInterval(interval);
  }, []);

  const handleTranslate = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  useEffect(() => {
    if (!widgetReady) {
      const timeout = setTimeout(() => {
        window.googleTranslateElementInit?.();
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [widgetReady]);

  if (!widgetReady) {
    return <p className="p-4 text-gray-500">Loading translator...</p>;
  }

  const languages = [
    { code: "en", label: "English", color: "bg-blue-600" },
    { code: "bn", label: "বাংলা", color: "bg-green-600" },
  ];

  return (
    <div className="flex gap-3 justify-center p-2 flex-wrap">
      <h1 className="text-black text-xl ">Change Language to your preference</h1>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleTranslate(lang.code)}
          className={`px-4 py-2 rounded-xl text-white hover:opacity-90 ${lang.color}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
export default LanguageSelector;
