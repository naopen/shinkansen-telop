import { useMemo, useState, useEffect } from "react";
import { calcScrollDuration } from "../utils/calcScrollDuration";
import "../styles/board.css";

interface ScrollingTextProps {
  text: string;
}

export function ScrollingText({ text }: ScrollingTextProps) {
  const duration = useMemo(() => calcScrollDuration(text), [text]);
  const [key, setKey] = useState(0);

  // テキストが変わったらアニメーションをリセット
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [text]);

  return (
    <div className="scroll">
      <span
        key={key}
        style={{ animationDuration: `${duration}s` }}
      >
        {text}
      </span>
    </div>
  );
}
