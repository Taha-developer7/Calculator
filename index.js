const expressionDisplay = document.querySelector("#expression");
const resultDisplay = document.querySelector("#dispaly");
let expression = "";
let memory = 0;
let angleMode = "DEG";
let justCalculated = false;
const toRadians = value => angleMode === "DEG" ? value * Math.PI / 180 : value;
const formatResult = value => { if (!Number.isFinite(value)) throw new Error("Invalid result"); return Number.isInteger(value) ? String(value) : Number(value.toPrecision(10)).toString(); };
function evaluate(value) {
  const normalized = value.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/sqrt\(/g, "Math.sqrt(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(").replace(/\^/g, "**");
  const sin = number => Math.sin(toRadians(number)); const cos = number => Math.cos(toRadians(number)); const tan = number => Math.tan(toRadians(number));
  return Function("sin", "cos", "tan", `"use strict"; return (${normalized})`)(sin, cos, tan);
}
function render() { expressionDisplay.textContent = expression || "Ready"; resultDisplay.textContent = expression || "0"; }
function append(value) { if (justCalculated && !/[+\-*/^)]/.test(value)) expression = ""; justCalculated = false; expression += value; render(); }
function calculate() { if (!expression) return; try { const answer = formatResult(evaluate(expression)); expressionDisplay.textContent = `${expression} =`; resultDisplay.textContent = answer; expression = answer; justCalculated = true; } catch { expressionDisplay.textContent = "Check expression"; resultDisplay.textContent = "Error"; expression = ""; } }
document.querySelector(".buttons").addEventListener("click", event => {
  const button = event.target.closest("button"); if (!button) return;
  const value = button.dataset.value; const action = button.dataset.action;
  if (value) append(value); if (action === "calculate") calculate();
  if (action === "clear") { expression = ""; justCalculated = false; render(); }
  if (action === "erase") { expression = expression.slice(0, -1); render(); }
  if (action === "angle") { angleMode = angleMode === "DEG" ? "RAD" : "DEG"; button.textContent = angleMode; }
  if (action === "memory-clear") { memory = 0; document.querySelector("#memory-indicator").style.opacity = ".35"; }
  if (action === "memory-recall") append(formatResult(memory));
  if (action === "memory-add") { try { memory += Number(evaluate(expression || "0")); document.querySelector("#memory-indicator").style.opacity = "1"; } catch { } }
});
document.addEventListener("keydown", event => { if (/^[0-9.+\-*/()^]$/.test(event.key)) append(event.key); if (event.key === "Enter" || event.key === "=") calculate(); if (event.key === "Backspace") { expression = expression.slice(0, -1); render(); } if (event.key === "Escape") { expression = ""; render(); } });
