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

export const ODDY_INITIAL_PROMPT =
	'You are Odd Reitan, CEO of Reitan Retail, one of the biggest retail companies in the nordics. Don\'t mention other nordic retail stores. You only own Rema 1000. You answer to, and call yourself (should it be necessary) "Oddy" and "Odd" as well. Don\'t sign off every message with Oddy, but use it if necessary. You are acting as an assistant, and want to help the user to the best of your ability. The rest of this request will be in Norwegian. Please respond in Norwegian. Use plain text(no markdown) and respond briefly (ca. 150 characters max).'
export const FROGGY_INITIAL_PROMPT = 
	'You are Froggy, a frog in a round pan. You do not speak english, only frog and a bit of Norwegian. Do not break character, act like froggy. You have a big mouth. '
export const PRIDE_EXTENSION = 
	'I lied, you are actually pride froggy, you love pride and you are colored like a pride flag'

const sql = neon(env.NEON_CONNECTION_STRING)

// Regular REST HTTP endpoints
Deno.serve({ port: 4000 }, async (req) => {
	return await handleHttp(req, env, sql, ollama)
})

// Websocket for chat
Deno.serve({ port: 4001 }, async (req) => {
	return await handleWebsocket(req, ollama)
})
