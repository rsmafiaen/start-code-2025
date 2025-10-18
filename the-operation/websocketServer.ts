import type { Message, Ollama } from "npm:ollama"
import { ODDY_INITIAL_PROMPT, FROGGY_INITIAL_PROMPT, PRIDE_EXTENSION } from "./main.ts"

export const handleWebsocket = (req: Request, ollama: Ollama) => {
	if (req.headers.get("upgrade") !== "websocket") {
		return new Response(null, { status: 501 })
	}

	const url = new URL(req.url)
	const agent = (url.searchParams.get("agent") ?? "oddy").toLowerCase() // "oddy" | "froggy"
	const isPride = url.searchParams.get("isPride") === "true"

	const basePrompt =
		agent === "froggy"
			? FROGGY_INITIAL_PROMPT + (isPride ? PRIDE_EXTENSION : "")
			: ODDY_INITIAL_PROMPT

	let messages: Message[] = []

	const { socket, response } = Deno.upgradeWebSocket(req)

	socket.onopen = () => {
		socket.send("Successfully connected")
	}

	socket.onmessage = async (event) => {
		try {
			const userText = String(event.data ?? "")
			const newMessage: Message = {
				role: "user",
				content:
					messages.length === 0
						? `${basePrompt} The first request from the user is: ${userText}`
						: userText,
			}

			const chat = await ollama.chat({
				model: "gpt-oss:120b",
				messages: [...messages, newMessage],
			})

			const botMsg = chat.message
			messages = [...messages, newMessage, botMsg]
			socket.send(botMsg.content ?? "")
		} catch (err) {
			console.error("WebSocket handler error:", err)
			socket.send("Beklager, noe gikk galt.")
		}
	}

	socket.onerror = (error) => {
		console.error("WebSocket error:", error)
	}

	return response
}
