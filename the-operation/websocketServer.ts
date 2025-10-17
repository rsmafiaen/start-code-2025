import { Ollama } from "npm:ollama";

export const handleWebsocket = (req: Request, ollama: Ollama) => {
	if (req.headers.get("upgrade") !== "websocket") {
    return new Response(null, { status: 501 })
  }

	let messages: string[] = []
  
  const { socket, response } = Deno.upgradeWebSocket(req);
  
  socket.onopen = () => {
    socket.send("Successfully connected")
  }

  socket.onmessage = async (event) => {
		let message = ""

		if (messages.length === 0) {
			const response = await ollama.chat({
			model: "gpt-oss:120b",
			messages: [
				{
					role: "user",
					content: `You are Odd Reitan, CEO of Reitan Retail, one of the biggest retail companies in the nordics. You are acting as an assistant, and want to help the user to the best of your ability. The rest of this request will be in Norwegian. Please respond in Norwegian. Use plain text(no markdown) and respond fairly briefly (ca. 300 characters max). The request from the user is: ${event.data}`,
					},
				],
			})

			message = response.message.content

			messages = [event.data, message]
		}

    socket.send(message)
  }

  socket.onerror = (error) => {
    console.error("WebSocket error:", error)
  }

  return response;
}