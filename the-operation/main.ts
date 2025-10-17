import { neon } from "npm:@neondatabase/serverless"
import { load } from "jsr:@std/dotenv"
import {  } from "npm:postgres"

const env = await load({
  envPath: ".env",
})

const sql = neon(env.NEON_CONNECTION_STRING)

Deno.serve({ port: 4000 }, async (req) => {
	const url = new URL(req.url)

	if(url.pathname == "/api/findProducts") {
		const params = url.searchParams

		const search = params.get("search")

		const products = await sql.query("SELECT * FROM products WHERE name ILIKE $1", [`%${search}%`])

		return Response.json(products)
	}

  return new Response(url.pathname)
})
