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

## Running with Docker

You can build and run the app using Docker and Docker Compose. The app will be available at [http://localhost:3500](http://localhost:3500).

### Build and Run

```
docker-compose up --build
```

This will:
- Build the Docker image using the provided `Dockerfile`.
- Start the app in a container, mapping port 3500 on your host to port 3000 in the container (the default Next.js port).

### Stopping the App

To stop the app, press `Ctrl+C` in the terminal, or run:

```
docker-compose down
```

### Notes
- The app runs in production mode with `NODE_ENV=production`.
- You can modify the `docker-compose.yml` or `Dockerfile` for custom setups as needed.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the [MIT License](./LICENSE).

## 🖼️ Image Attachment & Multi-modality

- **Paste, drag-and-drop, or attach images**: You can paste images, drag-and-drop them into the chat input, or use the attach button to select image files. A thumbnail preview appears above the input before sending.
- **Send multiple images at once**: You can attach, paste, or drag-and-drop multiple images in a single message. All selected images will be sent together and shown as thumbnails in your chat message.
- **Remove before sending**: Click the × button on any thumbnail to remove that image before sending.
- **Image thumbnails in chat**: Sent images appear as small thumbnails under your message in the chat history, saving space and keeping the UI clean. (Click-to-enlarge coming soon!)
- **Supports multi-modality**: Images, video, and audio are all rendered inline in the chat.

## ⚡ Real-time Tool Calls & Reasoning

- **Tool calls stream in real time**: As the agent invokes tools, you see each tool call appear instantly under the agent message.
- **Click for details**: Click any tool call chip to open a modal with all tool call arguments, content, and metrics.
- **Reasoning streams in real time**: Agent reasoning steps are streamed and shown live as the agent thinks.
