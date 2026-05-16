import { Card } from '@/components/common/Card'

type PitchAudioCardProps = {
  audioUrl?: string
}

export function PitchAudioCard({ audioUrl }: PitchAudioCardProps) {
  if (!audioUrl) return null

  return (
    <Card>
      <h4 className="mb-3 font-semibold text-slate-100">Pitch audio</h4>
      <audio controls className="w-full" src={audioUrl}>
        Your browser does not support audio playback.
      </audio>
    </Card>
  )
}
