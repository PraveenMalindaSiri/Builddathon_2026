import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/common/Button'
import { env } from '@/config/env'
import { useClipboard } from '@/hooks/useClipboard'
import { IconCopy, IconDownload, IconReport } from '@/components/icons/Icons'
import {
  downloadFile,
  pitchDeckToMarkdown,
  pitchResultToMarkdown,
} from '@/lib/exportMarkdown'
import { downloadPitchJsonReport } from '@/services/sessionService'
import type { PitchGenerationResult } from '@/types/pitch'

type ExportActionsProps = {
  result: PitchGenerationResult
  sessionId: string
}

export function ExportActions({ result, sessionId }: ExportActionsProps) {
  const { copy } = useClipboard()
  const [reportLoading, setReportLoading] = useState(false)

  const fullMarkdown = pitchResultToMarkdown(result)
  const deckMarkdown = pitchDeckToMarkdown(result)
  const qaMarkdown = result.investorQA
    .map((q) => `## ${q.question}\n\n${q.answerFramework}`)
    .join('\n\n')

  const handleDownloadReport = async () => {
    setReportLoading(true)
    try {
      if (env.useMockApi) {
        downloadFile(
          JSON.stringify(result, null, 2),
          `launchpad-pitch-${sessionId}.json`,
          'application/json',
        )
        return
      }
      await downloadPitchJsonReport(sessionId)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to download report')
    } finally {
      setReportLoading(false)
    }
  }

  return (
    <div className="mb-8 flex flex-wrap gap-2 rounded-2xl glass-panel p-4">
      <Button variant="secondary" size="sm" onClick={() => copy(fullMarkdown, 'Full report copied')}>
        <IconCopy size={16} />
        Copy full report
      </Button>
      <Button variant="outline" size="sm" onClick={() => copy(deckMarkdown, 'Pitch deck copied')}>
        <IconCopy size={16} />
        Copy pitch deck
      </Button>
      <Button variant="outline" size="sm" onClick={() => copy(qaMarkdown, 'Investor Q&A copied')}>
        <IconCopy size={16} />
        Copy investor Q&A
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          downloadFile(fullMarkdown, 'launchpad-pitch.md', 'text/markdown')
        }
      >
        <IconDownload size={16} />
        Download Markdown
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadReport}
        disabled={reportLoading}
      >
        <IconReport size={16} />
        {reportLoading ? 'Downloading…' : 'Download report'}
      </Button>
    </div>
  )
}
