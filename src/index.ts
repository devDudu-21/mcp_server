import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

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
          text: `Tarefa criada com sucesso! ID: ${taskId}`,
        },
      ],
    };
  }
);

async function startMcpServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[MCP Server] Servidor MCP iniciado e conectado via stdio.");
}

startMcpServer().catch((error) => {
  console.error("[MCP Server] Erro ao iniciar o servidor MCP:", error);
  process.exit(1);
});
