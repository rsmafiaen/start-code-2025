import { neon } from "npm:@neondatabase/serverless"
import { load } from "jsr:@std/dotenv"
import { Ollama } from "npm:ollama"
import { handleHttp } from "./httpServer.ts"
import { handleWebsocket } from "./websocketServer.ts"

const env = await load({
	envPath: ".env",
})

const ollama = new Ollama({
	host: "https://ollama.com",
	headers: {
		Authorization: `Bearer ${env.OLLAMA_API_KEY}`,
	},
})

const sql = neon(env.NEON_CONNECTION_STRING)

// Regular REST HTTP endpoints
Deno.serve({ port: 4000 }, async (req) => {
	return await handleHttp(req, env, sql, ollama)
})

// Websocket for chat
Deno.serve({ port: 4001 }, async (req) => {
	return await handleWebsocket(req, ollama)
})
