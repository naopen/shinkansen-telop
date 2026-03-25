export function calcScrollDuration(text: string): number {
  const plainText = text.replace(/<[^>]*>/g, "");
  const count = plainText.length;
  const speed = 4.0;
  return Math.floor((count * 2 + 8) / speed);
}
