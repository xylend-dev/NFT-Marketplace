export const getAbbreviatedText = (text: string, maxLength: number = 20) => {
  if (text.length - 3 <= maxLength) {
    return text;
  }
  const abbreviatedText = text.substring(0, maxLength);
  const initialText = abbreviatedText.substring(0, maxLength / 2 - 1);
  const finalText = abbreviatedText.substring(maxLength / 2 + 1);

  return initialText + "..." + finalText;
};
