import { Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useVoiceInput } from '@/hooks/useVoiceInput'

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const { isListening, supported, toggle } = useVoiceInput(onTranscript)

  if (!supported) {
    return (
      <p className="text-xs text-slate-500">
        Voice input is not supported in this browser. You can type your idea instead.
      </p>
    )
  }

  return (
    <Button
      type="button"
      variant={isListening ? 'secondary' : 'outline'}
      size="sm"
      onClick={toggle}
      aria-pressed={isListening}
      aria-label={isListening ? 'Stop recording' : 'Start voice input'}
    >
      {isListening ? (
        <>
          <MicOff className="h-4 w-4" />
          Stop listening
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" />
          Speak your idea
        </>
      )}
    </Button>
  )
}
