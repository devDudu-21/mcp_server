import { loadTools, startMcpServer } from "./helpers.js";

await loadTools().catch((error) => {
  console.error("[MCP Server] Erro ao carregar ferramentas:", error);
  process.exit(1);
});

startMcpServer().catch((error) => {
  console.error("[MCP Server] Erro ao iniciar o servidor MCP:", error);
  process.exit(1);
});
