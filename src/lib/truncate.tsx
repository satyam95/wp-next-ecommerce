export const truncateHTML = (html: string, wordLimit: number): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  const words = text.split(/\s+/).slice(0, wordLimit).join(" ");

  return words + (words.length < text.length ? "..." : "");
};
