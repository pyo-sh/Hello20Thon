export function ConvertSystemSourcetoHtml(str) {
  if (!str) {
    return;
  }
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
} // &amp 와 같은 html 특수문자를 치환한다.
