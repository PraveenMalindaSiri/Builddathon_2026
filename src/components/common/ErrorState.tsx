import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { IconShield } from '@/components/icons/Icons'

type ErrorStateProps = {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="text-center">
      <IconShield className="mx-auto mb-3 text-warm" size={40} aria-hidden />
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{message}</p>
      {onRetry && (
        <Button className="mt-5" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Card>
  )
}
