
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"


export function MessageActions({ messageId, content, onRegenerate }) {
  const [isLiked, setIsLiked] = useState(null)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Message copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy message")
    }
  }

  const handleLike = () => {
    setIsLiked(true)
    // Here you can add API call to store the like
    toast.success("Response marked as helpful")
  }

  const handleDislike = () => {
    setIsLiked(false)
    // Here you can add API call to store the dislike
    toast.success("Response marked as not helpful")
  }

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true)
      await onRegenerate(messageId)
      toast.success("Regenerating response...")
    } catch (error) {
      toast.error("Failed to regenerate response")
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleCopy}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        title="Copy message"
      >
        <Copy className="w-4 h-4 text-gray-500" />
      </button>
      <button
        onClick={handleLike}
        className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${
          isLiked === true ? "text-green-500" : "text-gray-500"
        }`}
        title="Mark as helpful"
        disabled={isLiked !== null}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={handleDislike}
        className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${
          isLiked === false ? "text-red-500" : "text-gray-500"
        }`}
        title="Mark as not helpful"
        disabled={isLiked !== null}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
      <button
        onClick={handleRegenerate}
        className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors ${
          isRegenerating ? "animate-spin" : ""
        }`}
        title="Regenerate response"
        disabled={isRegenerating}
      >
        <RotateCcw className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  )
}

