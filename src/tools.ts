import z from "zod";
import server from "./server.js";

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

export default server;
