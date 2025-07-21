import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server: McpServer = new McpServer(
  { name: "MCP Server", version: "1.0.0" },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

export default server;
