# Agent UI

A modern chat interface for AI agents built with Next.js, Tailwind CSS, and TypeScript. This template provides a ready-to-use UI for interacting with Agno agents.

<img src="https://github.com/user-attachments/assets/7765fae5-a813-46cb-993b-904af9bc1672" alt="agent-ui" style="border-radius: 10px; width: 100%; max-width: 800px;" />

## Features

- 💬 **Modern Chat Interface**: Clean design with real-time streaming support
- 🧩 **Tool Calls Support**: Visualizes agent tool calls and their results, with real-time streaming and modal details
- 🧠 **Reasoning Steps**: Displays agent reasoning process, streamed in real time as the agent thinks
- 📚 **References Support**: Show sources used by the agent
- 🖼️ **Image Attachment & Multi-modality**: Paste, drag-and-drop, or attach images to your message. See thumbnail previews before sending. Images, video, and audio are all supported in chat.
- 🎨 **Customizable UI**: Built with Tailwind CSS for easy styling
- 🧰 **Built with Modern Stack**: Next.js, TypeScript, shadcn/ui, Framer Motion, and more

## Getting Started

### Prerequisites

Before setting up Agent UI, you may want to have an Agno Playground running. If you haven't set up the Agno Playground yet, follow the [official guide](https://agno.link/agent-ui#connect-to-local-agents) to run the Playground locally.

### Installation

### Automatic Installation (Recommended)

```bash
npx create-agent-ui@latest
```

### Manual Installation

1. Clone the repository:

```bash
git clone https://github.com/agno-agi/agent-ui.git
cd agent-ui
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connecting to an Agent Backend

By default Agent UI connects to `http://localhost:7777`. You can easily change this by hovering over the endpoint URL and clicking the edit option.

The default endpoint works with the standard Agno Playground setup described in the [official documentation](https://agno.link/agent-ui#connect-to-local-agents).

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the [MIT License](./LICENSE).

## 🖼️ Image Attachment & Multi-modality

- **Paste, drag-and-drop, or attach images**: You can paste images, drag-and-drop them into the chat input, or use the attach button to select an image file. A thumbnail preview appears above the input before sending.
- **Remove before sending**: Click the × button on the thumbnail to remove the image before sending.
- **Image thumbnails in chat**: Sent images appear as thumbnails under your message in the chat history.
- **Supports multi-modality**: Images, video, and audio are all rendered inline in the chat.

## ⚡ Real-time Tool Calls & Reasoning

- **Tool calls stream in real time**: As the agent invokes tools, you see each tool call appear instantly under the agent message.
- **Click for details**: Click any tool call chip to open a modal with all tool call arguments, content, and metrics.
- **Reasoning streams in real time**: Agent reasoning steps are streamed and shown live as the agent thinks.
