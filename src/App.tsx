import { useEffect } from "react";
import { useNewsFeed } from "./hooks/useNewsFeed";
import { useKioskMode } from "./hooks/useKioskMode";
import { formatNews } from "./utils/formatNews";
import { ShinkansenBoard } from "./components/ShinkansenBoard";

function App() {
  const kioskMode = useKioskMode();
  const { items, loading } = useNewsFeed();

  const scrollText = loading
    ? "◇ニュースを取得しています...　　　　　　　　　　◇しばらくお待ちください"
    : formatNews(items);

  // キオスクモード時に body にクラスを付与
  useEffect(() => {
    if (kioskMode) {
      document.body.classList.add("kiosk");
    }
    return () => {
      document.body.classList.remove("kiosk");
    };
  }, [kioskMode]);

  return (
    <div className="app">
      <ShinkansenBoard text={scrollText} kioskMode={kioskMode} />
      {!kioskMode && (
        <footer className="credit">
          Powered by shinkansen-telop | NHKニュース RSS
        </footer>
      )}
    </div>
  );
}

export default App;
