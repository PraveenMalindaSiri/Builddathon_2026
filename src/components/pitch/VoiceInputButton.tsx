import { Button } from '@/components/common/Button'
import { IconMic } from '@/components/icons/Icons'
import { useVoiceInput } from '@/hooks/useVoiceInput'

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const { isListening, supported, toggle } = useVoiceInput(onTranscript)

  if (!supported) {
    return (
      <p className="text-xs text-ink-muted">
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
      className={isListening ? 'ring-2 ring-accent/40' : ''}
    >
      <IconMic size={16} className={isListening ? 'text-warm' : ''} />
      {isListening ? 'Stop listening' : 'Speak your idea'}
    </Button>
  )
}
