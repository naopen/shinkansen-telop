import { useNewsFeed } from "./hooks/useNewsFeed";
import { formatNews } from "./utils/formatNews";
import { ShinkansenBoard } from "./components/ShinkansenBoard";

function App() {
  const { items, loading } = useNewsFeed();

  const scrollText = loading
    ? "◇ニュースを取得しています...　　　　　　　　　　◇しばらくお待ちください"
    : formatNews(items);

  return (
    <div className="app">
      <ShinkansenBoard text={scrollText} />
      <footer className="credit">
        Powered by shinkansen-telop | NHKニュース RSS
      </footer>
    </div>
  );
}

export default App;
