import { Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'

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
      <Lightbulb className="mx-auto mb-3 h-10 w-10 text-blue-400" aria-hidden />
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
      <Link to={actionTo} className="mt-4 inline-block">
        <Button>{actionLabel}</Button>
      </Link>
    </Card>
  )
}
