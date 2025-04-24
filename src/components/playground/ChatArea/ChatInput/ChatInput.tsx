'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { TextArea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { usePlaygroundStore } from '@/store'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { useQueryState } from 'nuqs'
import Icon from '@/components/ui/icon'

const ChatInput = () => {
  const { chatInputRef } = usePlaygroundStore()

  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedAgent] = useQueryState('agent')
  const [inputMessage, setInputMessage] = useState('')
  const isStreaming = usePlaygroundStore((state) => state.isStreaming)
  const [pastedImage, setPastedImage] = useState<File | null>(null)

  const handleSubmit = async () => {
    if (!inputMessage.trim() && !pastedImage) return

    try {
      if (pastedImage) {
        const formData = new FormData();
        formData.append('files', pastedImage);
        if (inputMessage.trim()) {
          formData.append('message', inputMessage);
        }
        setInputMessage('');
        setPastedImage(null);
        await handleStreamResponse(formData);
      } else {
        const currentMessage = inputMessage;
        setInputMessage('');
        await handleStreamResponse(currentMessage);
      }
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          setPastedImage(file);
          e.preventDefault();
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setPastedImage(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-2xl">
        {pastedImage && (
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <img
                src={URL.createObjectURL(pastedImage)}
                alt="Attached preview"
                className="w-16 h-16 object-cover rounded-lg border border-accent shadow"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
                onClick={() => setPastedImage(null)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className="relative mx-auto mb-1 flex w-full max-w-2xl items-end justify-center gap-x-2 font-geist"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex-1">
          <TextArea
            placeholder={'Ask anything'}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.nativeEvent.isComposing &&
                !e.shiftKey &&
                !isStreaming
              ) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            className="w-full border border-accent bg-primaryAccent px-4 text-sm text-primary focus:border-accent"
            disabled={!selectedAgent}
            ref={chatInputRef}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!selectedAgent || (!inputMessage.trim() && !pastedImage) || isStreaming}
          size="icon"
          className="rounded-xl bg-primary p-5 text-primaryAccent"
        >
          <Icon type="send" color="primaryAccent" />
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
