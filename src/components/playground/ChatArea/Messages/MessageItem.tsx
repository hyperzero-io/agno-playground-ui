import Icon from '@/components/ui/icon'
import MarkdownRenderer from '@/components/ui/typography/MarkdownRenderer'
import { usePlaygroundStore } from '@/store'
import type { PlaygroundChatMessage, ToolCall } from '@/types/playground'
import Videos from './Multimedia/Videos'
import Images from './Multimedia/Images'
import Audios from './Multimedia/Audios'
import { memo } from 'react'
import AgentThinkingLoader from './AgentThinkingLoader'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'

interface MessageProps {
  message: PlaygroundChatMessage
}

const AgentMessage = ({ message }: MessageProps) => {
  const { streamingErrorMessage } = usePlaygroundStore()
  let messageContent
  if (message.streamingError) {
    messageContent = (
      <p className="text-destructive">
        Oops! Something went wrong while streaming.{' '}
        {streamingErrorMessage ? (
          <>{streamingErrorMessage}</>
        ) : (
          'Please try refreshing the page or try again later.'
        )}
      </p>
    )
  } else if (message.content) {
    messageContent = (
      <div className="flex w-full flex-col gap-4">
        <MarkdownRenderer>{message.content}</MarkdownRenderer>
        {message.videos && message.videos.length > 0 && (
          <Videos videos={message.videos} />
        )}
        {message.images && message.images.length > 0 && (
          <Images images={message.images} />
        )}
        {message.audio && message.audio.length > 0 && (
          <Audios audio={message.audio} />
        )}
      </div>
    )
  } else if (message.response_audio) {
    if (!message.response_audio.transcript) {
      messageContent = (
        <div className="mt-2 flex items-start">
          <AgentThinkingLoader />
        </div>
      )
    } else {
      messageContent = (
        <div className="flex w-full flex-col gap-4">
          <MarkdownRenderer>
            {message.response_audio.transcript}
          </MarkdownRenderer>
          {message.response_audio.content && message.response_audio && (
            <Audios audio={[message.response_audio]} />
          )}
        </div>
      )
    }
  } else {
    messageContent = (
      <div className="mt-2">
        <AgentThinkingLoader />
      </div>
    )
  }

  return (
    <div className="flex flex-row items-start gap-4 font-geist">
      <div className="flex-shrink-0">
        <Icon type="agent" size="sm" />
      </div>
      {messageContent}
    </div>
  )
}

const UserMessage = memo(({ message }: MessageProps) => {
  return (
    <div className="flex items-start pt-4 text-start max-md:break-words">
      <div className="flex flex-row gap-x-3">
        <p className="flex items-center gap-x-2 text-sm font-medium text-muted">
          <Icon type="user" size="sm" />
        </p>
        <div className="text-md rounded-lg py-1 font-geist text-secondary">
          {message.content}
          {message.images && message.images.length > 0 && (
            <div className="mt-2">
              <Images images={message.images} thumbnail />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

const ToolCallModal = ({ tool }: { tool: ToolCall }) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer rounded-full bg-accent px-2 py-1.5 text-xs font-dmmono uppercase text-primary/80">
          {tool.tool_name}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tool Call: {tool.tool_name}</DialogTitle>
          <DialogDescription>
            <div className="mt-2 text-xs text-muted-foreground max-h-[60vh] overflow-auto pr-2">
              <div><b>ID:</b> {tool.tool_call_id}</div>
              <div><b>Role:</b> {tool.role}</div>
              {tool.content && <div className="mt-2 whitespace-pre-line"><b>Content:</b><br />{tool.content}</div>}
              {tool.tool_args && (
                <div className="mt-2">
                  <b>Arguments:</b>
                  <pre className="bg-muted rounded p-2 mt-1 text-xs overflow-x-auto">{JSON.stringify(tool.tool_args, null, 2)}</pre>
                </div>
              )}
              {tool.metrics && (
                <div className="mt-2">
                  <b>Metrics:</b>
                  <pre className="bg-muted rounded p-2 mt-1 text-xs overflow-x-auto">{JSON.stringify(tool.metrics, null, 2)}</pre>
                </div>
              )}
              {typeof tool.tool_call_error !== 'undefined' && (
                <div className="mt-2"><b>Error:</b> {tool.tool_call_error ? 'Yes' : 'No'}</div>
              )}
              {tool.created_at && (
                <div className="mt-2"><b>Created At:</b> {tool.created_at}</div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const ToolComponent = memo(({ tools }: { tools: ToolCall }) => (
  <ToolCallModal tool={tools} />
))

AgentMessage.displayName = 'AgentMessage'
UserMessage.displayName = 'UserMessage'
ToolComponent.displayName = 'ToolComponent'
export { AgentMessage, UserMessage, ToolComponent }
