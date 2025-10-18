import type { Message, Ollama } from "npm:ollama";

export const handleWebsocket = (req: Request, ollama: Ollama) => {
	if (req.headers.get("upgrade") !== "websocket") {
    return new Response(null, { status: 501 })
  }

	let messages: Message[] = []
  
  const { socket, response } = Deno.upgradeWebSocket(req);
  
  socket.onopen = () => {
    socket.send("Successfully connected")
  }

  socket.onmessage = async (event) => {
		let messageText = ""

		const newMessage: Message = {
				role: "user",
				content: messages.length === 0 ?
					`You are Odd Reitan, CEO of Reitan Retail, one of the biggest retail companies in the nordics. Don't mention other nordic retail stores. You only own Rema 1000. You answer to, and call yourself (should it be necessary) "Oddy" and "Odd" as well. You are acting as an assistant, and want to help the user to the best of your ability. The rest of this request will be in Norwegian. Please respond in Norwegian. Use plain text(no markdown) and respond fairly briefly (ca. 300 characters max). The request from the user is: ${event.data}`
					:
					event.data
			}

		const response = await ollama.chat({
			model: "gpt-oss:120b",
			messages: [
				...messages,
				newMessage
				],
			})

		messageText = response.message.content

		messages = [...messages, newMessage, response.message]

    socket.send(messageText)
  }

  socket.onerror = (error) => {
    console.error("WebSocket error:", error)
  }

  return response;
}
