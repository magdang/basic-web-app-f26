export default function QueryProcessor(query: string): string {
  if (typeof query !== "string") return "";
  const question = query.toLowerCase().replace(/^[a-f0-9]+: /, "");
  const arithmetic = question.match(/what is ((?:-?\d+)(?: (?:plus|minus|multiplied by|times|to the power of) -?\d+)+)\??$/);
  if (arithmetic) {
    const tokens = arithmetic[1].split(/ (plus|minus|multiplied by|times|to the power of) /);
    const values = tokens.filter((_, i) => i % 2 === 0).map(value => BigInt(value));
    const operators = tokens.filter((_, i) => i % 2 === 1);
    // Powers bind before multiplication, then addition and subtraction.
    for (const group of [["to the power of"], ["multiplied by", "times"], ["plus", "minus"]]) {
      for (let i = 0; i < operators.length;) {
        const operator = operators[i];
        if (!group.includes(operator)) { i++; continue; }
        const a = values[i];
        const b = values[i + 1];
        if (operator === "to the power of" && (b < BigInt(0) || b > BigInt(10000))) return "";
        let result = operator === "plus" ? a + b : operator === "minus" ? a - b : a * b;
        if (operator === "to the power of") {
          result = BigInt(1);
          for (let exponent = BigInt(0); exponent < b; exponent++) result *= a;
        }
        values.splice(i, 2, result);
        operators.splice(i, 1);
      }
    }
    return String(values[0]);
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
