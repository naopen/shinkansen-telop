import { ScrollingText } from "./ScrollingText";
import { GridOverlay } from "./GridOverlay";
import "../styles/global.css";

interface ShinkansenBoardProps {
  text: string;
}

export function ShinkansenBoard({ text }: ShinkansenBoardProps) {
  return (
    <div className="display-part">
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
