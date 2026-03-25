import { ScrollingText } from "./ScrollingText";
import { GridOverlay } from "./GridOverlay";
import "../styles/global.css";

interface ShinkansenBoardProps {
  text: string;
  kioskMode: boolean;
}

export function ShinkansenBoard({ text, kioskMode }: ShinkansenBoardProps) {
  return (
    <div className={`display-part${kioskMode ? " kiosk" : ""}`}>
      <img
        src="/background.jpg"
        alt="新幹線車内"
        className="back-img"
      />
      <ScrollingText text={text} />
      <GridOverlay />
    </div>
  );
}
