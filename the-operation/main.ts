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

		if (oddyInput == "monster" || oddyInput == "\"monster\"") {
			return Response.json({ message: `Hei! 😊  
																			Hvis du tenker på å kjøpe en **Monster‑drikk**, så har vi i Reitan Retail et bredt utvalg som passer ulike smaker og behov. Her er noen av våre mest populære valg, og tips til hvordan du kan velge den som passer best for deg:

																			| Variant | Smak/Profil | Når du kan bruke den | Anbefaling |
																			|---------|-------------|----------------------|------------|
																			| **Monster Energy Original** | Klassisk, søt og kraftfull med en tydelig energistyrke | Når du trenger en kraftig energiboost, f.eks. på lange kjøreturer eller intense treningsøkter | God for deg som liker den tradisjonelle “monster‑smaken”. |
																			| **Monster Ultra (Zero Sugar)** | Lett, fruktig (bl.a. Ultra Red, Ultra Blue, Ultra Sunrise) | Når du vil ha energi uten sukker eller ekstra kalorier | Perfekt for deg som er bevisst på sukkerinntaket, men fortsatt ønsker et løft. |
																			| **Monster Rehab** | Kombinasjon av energi og iste (f.eks. Lemonade, Peach Tea) | Perfekt som en forfriskende drikk på varme dager eller etter trening | Et mer avslappet alternativ med mindre bitterhet. |
																			| **Monster Hydro** | Sportsspesifikk, med elektrolytter og vitaminer | Ideell for sport eller fysisk aktivitet med mye svette | Bra for å kombinere væskebalanse og energi. |
																			| **Monster Juice** (f.eks. Monster Mango, Monster Pineapple) | Fruktig, mer juice‑preget | Når du vil ha en søtere, mer “naturlig” drikk med litt ekstra energi | Passer godt som en smakfull belønning etter en arbeidsdag. |

																			### Hvordan velge?

																			1. **Sukker/kalorier** – Ønsker du en sukkerfri variant? Da er *Monster Ultra* eller *Monster Hydro* gode valg.  
																			2. **Smakspreferanser** – Foretrekker du klassisk cola‑lignende energi eller noe fruktig? Klassikeren er *Original*, mens fruktige alternativer finnes i *Ultra*‑linjen og *Monster Juice*.  
																			3. **Bruksområde** – For bilkjøring eller lange arbeidsdager kan du gå for *Original* eller *Ultra*. Til trening er *Hydro* eller *Rehab* ofte best.  

																			### Hvor finner du dem?

																			Alle våre **Rema 1000**, **Coop Mega**, **Coop Obs!**, **Coop Prix** og **Coop Prix**‑butikker har et godt sortiment av Monster‑produkter. Du kan også bestille dem via våre nettbutikker eller hente dem i **Meny**‑kjeder hvor vi har et samarbeid. Sjekk gjerne vår app for å se lagerstatus i din nærmeste butikk.

																			---

																			**Kort oppsummert:**  
																			- **Om du vil ha den tradisjonelle kraftige energien** → *Monster Energy Original*.  
																			- **Om du vil ha noe lettere og sukkerfritt** → *Monster Ultra* (f.eks. Ultra Red).  
																			- **Om du kombinerer trening og væskebalanse** → *Monster Hydro*.  

																			Håper dette hjelper deg med å finne den rette Monster‑drikken! Hvis du har flere spørsmål – for eksempel om pris, tilbud eller aktuelle kampanjer – er det bare å spørre. 🎉

																			Med vennlig hilsen,  
																			**Odd Reitan**  
																			CEO, Reitan Retail
																			// `.replaceAll("\t", "")}, { status: 418 })
		}

		const response = await ollama.chat({
			model: "gpt-oss:120b",
			messages: [{ role: "user", content: `You are Odd Reitan, CEO of Reitan Retail, one of the biggest retail companies in the nordics. You are acting as an assistant, and want to help the user to the best of your ability. The rest of this request will be in Norwegian. Please respond in Norwegian. Use plain text(no markdown) and respond breifly (ca. 150 characters max). The request from the user is: ${oddyInput}` }],
		})

		return Response.json({ message: response.message.content })
	}

  return new Response(url.pathname)
})
