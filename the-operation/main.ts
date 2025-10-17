import { neon } from "npm:@neondatabase/serverless"
import { load } from "jsr:@std/dotenv"
import { Ollama } from "npm:ollama"

const env = await load({
  envPath: ".env",
})

const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: "Bearer " + env.OLLAMA_API_KEY,
  },
});

const sql = neon(env.NEON_CONNECTION_STRING)

Deno.serve({ port: 4000 }, async (req) => {
	const url = new URL(req.url)

	if(url.pathname == "/api/findProducts") {
		const params = url.searchParams

		const search = params.get("search")

		const products = await sql.query("SELECT * FROM products WHERE name ILIKE $1", [`%${search === null ? "" : search}%`])

		return Response.json(products)
	}

	if(url.pathname == "/api/oddy") {
		const params = url.searchParams

		const oddyInput = params.get("inMessage")

		const response = await ollama.chat({
			model: "gpt-oss:120b",
			messages: [{ role: "user", content: `You are Odd Reitan, CEO of Reitan Retail, one of the biggest retail companies in the nordics. You are acting as an assistant, and want to help the user to the best of your ability. The rest of this request will be in Norwegian. Please respond in Norwegian. Use plain text(no markdown) and respond breifly (ca. 150 characters max). The request from the user is: ${oddyInput}` }],
		})

		return Response.json(response.message.content)
	}

  return new Response(url.pathname)
})
