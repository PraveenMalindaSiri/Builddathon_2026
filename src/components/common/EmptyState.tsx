import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { IconIdea } from '@/components/icons/Icons'

type EmptyStateProps = {
  title?: string
  message?: string
  actionLabel?: string
  actionTo?: string
}

export function EmptyState({
  title = 'No pitch result found',
  message = 'Start by entering your business idea.',
  actionLabel = 'Create pitch',
  actionTo = '/pitch',
}: EmptyStateProps) {
  return (
    <Card className="text-center">
      <IconIdea className="mx-auto mb-4 text-accent" size={44} aria-hidden />
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{message}</p>
      <Link to={actionTo} className="mt-5 inline-block">
        <Button>{actionLabel}</Button>
      </Link>
    </Card>
  )
}
