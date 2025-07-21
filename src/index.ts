import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import { createServer } from "http";

const server = new McpServer(
  { name: "MCP Server", version: "1.0.0" },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

server.tool(
  "create_task",
  "Cria uma nova tarefa no sistema.",
  {
    title: z.string().describe("Título da tarefa"),
    description: z.string().describe("Descrição da tarefa"),
  },
  async ({ title, description }) => {
    console.error(
      `[MCP Server] Recebida requisição para criar tarefa: ${title}`
    );

    const taskId = `task-${Date.now()}`;
    return {
      content: [
        {
          type: "text",
          text: `Tarefa criada com sucesso! ID: ${taskId} - Título: ${title}, Descrição: ${description}`,
        },
      ],
    };
  }
);

async function startMcpServer() {
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

startMcpServer().catch((error) => {
  console.error("[MCP Server] Erro ao iniciar o servidor MCP:", error);
  process.exit(1);
});
