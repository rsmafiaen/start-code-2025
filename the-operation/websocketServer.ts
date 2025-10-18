import type { Message, Ollama } from "npm:ollama"
import { ODDY_INITIAL_PROMPT } from "./main.ts"

export const handleWebsocket = (req: Request, ollama: Ollama) => {
	if (req.headers.get("upgrade") !== "websocket") {
		return new Response(null, { status: 501 })
	}

	let messages: Message[] = []

	const { socket, response } = Deno.upgradeWebSocket(req)

	socket.onopen = () => {
		socket.send("Successfully connected")
	}

	socket.onmessage = async (event) => {
		let messageText = ""

		const newMessage: Message = {
			role: "user",
			content:
				messages.length === 0
					? `${ODDY_INITIAL_PROMPT} The first request from the user is: ${event.data}`
					: event.data,
		}

		const response = await ollama.chat({
			model: "gpt-oss:120b",
			messages: [...messages, newMessage],
		})

		messageText = response.message.content

		messages = [...messages, newMessage, response.message]

		socket.send(messageText)
	}

	socket.onerror = (error) => {
		console.error("WebSocket error:", error)
	}

	return response
}
