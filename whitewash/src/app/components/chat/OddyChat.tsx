"use client"
//! TEMPORARY FILE TO TEST WEBSOCKET CHATTING

import { useEffect, useRef, useState } from "react"
import { useStateArray } from "@/hooks/useStateArray"

export const OddyChat = () => {
	const [oddyMessages, addOddyMessage] = useStateArray<{ role: "user" | "oddy", message: string }>([])
	const [input, setInput] = useState("")
	const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:4001")

    ws.current.onopen = () => console.log("✅ Connected to WebSocket")
    ws.current.onmessage = (event) => event.data === "Successfully connected" ? null : addOddyMessage({role: "oddy", message: event.data})
    ws.current.onerror = (err) => console.error("❌ WebSocket error:", err)
    ws.current.onclose = () => console.log("🔌 WebSocket closed")

    return () => {
      ws.current?.close()
    }
  }, [])

	const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const msg: typeof oddyMessages[0] = { role: "user", message: input }

    addOddyMessage(msg)

    ws.current?.send(input)

    setInput("")

    console.log(oddyMessages)
  }
	

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border rounded p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Send
        </button>
      </form>

			{oddyMessages.map((message) => (<div key={message.message} className="flex w-full flex-col">
				<p className={message.role === "oddy" ? "self-start" : "self-end"}>{message.message}</p>
			</div>))}
		</div>
	)
}
