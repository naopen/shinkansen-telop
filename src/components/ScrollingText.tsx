import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { calcScrollDuration } from "../utils/calcScrollDuration";
import "../styles/board.css";

interface ScrollingTextProps {
  text: string;
}

export function ScrollingText({ text }: ScrollingTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const pendingTextRef = useRef<string | null>(null);
  const hasShownNewsRef = useRef(false);

  const duration = useMemo(
    () => calcScrollDuration(displayText),
    [displayText],
  );

  useEffect(() => {
    if (text === displayText) return;

    if (!hasShownNewsRef.current) {
      // 初回（ローディング → ニュース）: 即座に反映
      setDisplayText(text);
      hasShownNewsRef.current = true;
    } else {
      // 5分ごとの更新: 現在のスクロールが1周完了するまで待つ
      pendingTextRef.current = text;
    }
  }, [text, displayText]);

  // アニメーション1周完了時に保留テキストを適用
  const handleAnimationIteration = useCallback(() => {
    if (pendingTextRef.current !== null) {
      setDisplayText(pendingTextRef.current);
      pendingTextRef.current = null;
    }
  }, []);

  return (
    <div className="scroll">
      <span
        key={displayText}
        style={{ animationDuration: `${duration}s` }}
        onAnimationIteration={handleAnimationIteration}
      >
        {displayText}
      </span>
    </div>
  );
}
