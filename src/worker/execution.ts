import { Hono } from "hono";
import type { Env } from "./env";

const app = new Hono<{ Bindings: Env }>();

app.post("/api/execute", async (c) => {
  const { code, language } = await c.req.json();

  // In a real-world scenario, you would use a secure code execution sandbox.
  // For this example, we'll simulate the execution.

  let output = `Executing ${language} code...\n\n`;

  try {
    switch (language) {
      case "javascript":
        // In-memory execution (for demonstration purposes only)
        // WARNING: This is not safe for production. Use a proper sandbox.
        const result = eval(code);
        output += `> ${result}`;
        break;
      case "python":
      case "java":
      case "cpp":
        output += `Execution for ${language} is not yet implemented.`;
        break;
      default:
        output += `Language ${language} not supported.`;
    }
  } catch (error: any) {
    output += `Error: ${error.message}`;
  }

  return c.json({ output });
});

export default app;
