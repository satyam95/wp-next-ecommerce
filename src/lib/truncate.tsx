export const truncateHTML = (html: string, wordLimit: number): string => {
  if (typeof window === "undefined") {
    return html; // Return original HTML during SSR
  }

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};
