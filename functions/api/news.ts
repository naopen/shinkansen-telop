import { XMLParser } from "fast-xml-parser";

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSItem | RSSItem[];
    };
  };
}

const NHK_RSS_URL = "https://www3.nhk.or.jp/rss/news/cat0.xml";
const MAX_ITEMS = 12;

export const onRequestGet: PagesFunction = async () => {
  try {
    const response = await fetch(NHK_RSS_URL, {
      headers: { "User-Agent": "ShinkansenTelop/1.0" },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch NHK RSS" }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const xmlText = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: true,
      trimValues: true,
    });
    const parsed = parser.parse(xmlText) as RSSFeed;

    const rawItems = parsed.rss.channel.item;
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    const newsItems = items.slice(0, MAX_ITEMS).map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      description: item.description ?? "",
    }));

    return new Response(
      JSON.stringify({ items: newsItems }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
