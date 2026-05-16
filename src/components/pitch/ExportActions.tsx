import { Copy, Download, FileJson } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useClipboard } from '@/hooks/useClipboard'
import {
  downloadFile,
  pitchDeckToMarkdown,
  pitchResultToMarkdown,
} from '@/lib/exportMarkdown'
import type { PitchGenerationResult } from '@/types/pitch'

type ExportActionsProps = {
  result: PitchGenerationResult
  compact?: boolean
}

export function ExportActions({ result, compact }: ExportActionsProps) {
  const { copy } = useClipboard()

  const fullMarkdown = pitchResultToMarkdown(result)
  const deckMarkdown = pitchDeckToMarkdown(result)
  const qaMarkdown = result.investorQA
    .map((q) => `## ${q.question}\n\n${q.answerFramework}`)
    .join('\n\n')

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? '' : 'mb-6'}`}>
      <Button variant="secondary" size="sm" onClick={() => copy(fullMarkdown, 'Full report copied')}>
        <Copy className="h-4 w-4" />
        Copy full report
      </Button>
      <Button variant="outline" size="sm" onClick={() => copy(deckMarkdown, 'Pitch deck copied')}>
        <Copy className="h-4 w-4" />
        Copy pitch deck
      </Button>
      <Button variant="outline" size="sm" onClick={() => copy(qaMarkdown, 'Investor Q&A copied')}>
        <Copy className="h-4 w-4" />
        Copy investor Q&A
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          downloadFile(fullMarkdown, 'launchpad-pitch.md', 'text/markdown')
        }
      >
        <Download className="h-4 w-4" />
        Download Markdown
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          downloadFile(JSON.stringify(result, null, 2), 'launchpad-pitch.json', 'application/json')
        }
      >
        <FileJson className="h-4 w-4" />
        Download JSON
      </Button>
    </div>
  )
}
