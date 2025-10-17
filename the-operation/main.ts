import { neon } from "npm:@neondatabase/serverless"
import { load } from "jsr:@std/dotenv"

const env = await load({
  envPath: ".env",
})

const sql = neon(env.NEON_CONNECTION_STRING)

Deno.serve({ port: 4000 }, async (req) => {
	const url = new URL(req.url)

	if(url.pathname == "/api/allProducts") {
		const products = await sql`SELECT * FROM products`

		return Response.json(products)
	}

  return new Response(url.pathname)
})
