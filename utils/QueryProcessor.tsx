export default function QueryProcessor(query: string): string {
  if (typeof query !== "string") return "";
  const question = query.toLowerCase().replace(/^[a-f0-9]+: /, "");
  const arithmetic = question.match(/what is (-?\d+) (plus|minus|multiplied by|times) (-?\d+)/);
  if (arithmetic) {
    const a = Number(arithmetic[1]);
    const b = Number(arithmetic[3]);
    return String(arithmetic[2] === "plus" ? a + b : arithmetic[2] === "minus" ? a - b : a * b);
  }
  const numbers = question.split(":").pop()?.match(/-?\d+/g)?.map(Number) ?? [];
  if (question.includes("largest") && numbers.length) return String(Math.max(...numbers));
  if (question.includes("smallest") && numbers.length) return String(Math.min(...numbers));
  if (question.includes("which") && numbers.length) {
    if (question.includes("prime")) return numbers.filter(n => {
      if (n < 2) return false;
      for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
      return true;
    }).join(", ");
    if (question.includes("square") && question.includes("cube")) return numbers.filter(n => n >= 0 && Number.isInteger(Math.sqrt(n)) && Math.round(Math.cbrt(n)) ** 3 === n).join(", ");
  }
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew")){
    return "yousefh!!!!";
  }
  if (query.toLowerCase().includes("name")) {
    return "Yousef";
  }

  return "";
}
