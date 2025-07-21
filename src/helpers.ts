import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "node:http";
import server from "./server.js";
import tools from "./tools.js";

export async function startMcpServer() {
  const PORT = process.env.PORT || 8000;

  const httpServer = createServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => `session-${Date.now()}-${Math.random()}`,
  });

  await server.connect(transport);

  // Configure the HTTP server to handle MCP requests
  httpServer.on("request", (req, res) => {
    transport.handleRequest(req, res);
  });

  httpServer.listen(PORT, () => {
    console.error(`[MCP Server] Servidor MCP iniciado na porta ${PORT}`);
    console.error(
      `[MCP Server] Endpoint disponível em: http://localhost:${PORT}`
    );
  });
}

export async function loadTools() {
  // Load tools from the server
  tools;

  console.error("[MCP Server] Ferramentas carregadas com sucesso.");
}
