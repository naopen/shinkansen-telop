import type { NewsItem } from "../types/news";

const SEPARATOR = "　　　　　　　　　　"; // 全角スペース10個

export function formatNews(items: NewsItem[]): string {
  if (items.length === 0) {
    return "◇ニュースを取得しています...　　　　　　　　　　◇しばらくお待ちください";
  }
  return items.map((item) => `◇${item.title}`).join(SEPARATOR);
}
