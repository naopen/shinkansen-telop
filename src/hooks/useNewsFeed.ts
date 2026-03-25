import { useState, useEffect, useCallback } from "react";
import type { NewsItem } from "../types/news";

const FETCH_INTERVAL = 5 * 60 * 1000; // 5分

export function useNewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data.items ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      // エラー時は既存データを維持（setItemsしない）
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetch_ = async () => {
      if (!cancelled) await fetchNews();
    };

    fetch_();
    const id = setInterval(fetch_, FETCH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [fetchNews]);

  return { items, loading, error };
}
