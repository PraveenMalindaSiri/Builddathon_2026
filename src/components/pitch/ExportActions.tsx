import { useState } from 'react'
import { Copy, Download, FileJson, Presentation } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/common/Button'
import { env } from '@/config/env'
import { useClipboard } from '@/hooks/useClipboard'
import {
  downloadFile,
  pitchDeckToMarkdown,
  pitchResultToMarkdown,
} from '@/lib/exportMarkdown'
import {
  downloadPitchJsonReport,
  fetchPptxUrl,
} from '@/services/sessionService'
import type { PitchGenerationResult } from '@/types/pitch'

type ExportActionsProps = {
  result: PitchGenerationResult
  sessionId: string
}

export function ExportActions({ result, sessionId }: ExportActionsProps) {
  const { copy } = useClipboard()
  const [pptxLoading, setPptxLoading] = useState(false)
  const [reportLoading, setReportLoading] = useState(false)

  const fullMarkdown = pitchResultToMarkdown(result)
  const deckMarkdown = pitchDeckToMarkdown(result)
  const qaMarkdown = result.investorQA
    .map((q) => `## ${q.question}\n\n${q.answerFramework}`)
    .join('\n\n')

  const handleDownloadPptx = async () => {
    setPptxLoading(true)
    try {
      let url = result.pptxUrl
      if (!url && !env.useMockApi) {
        url = await fetchPptxUrl(sessionId)
      }
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        toast.error('PowerPoint is not ready yet. Try again after the pitch deck finishes generating.')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to download PowerPoint')
    } finally {
      setPptxLoading(false)
    }
  }

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
    <div className="mb-6 flex flex-wrap gap-2">
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
        onClick={handleDownloadReport}
        disabled={reportLoading}
      >
        <FileJson className="h-4 w-4" />
        {reportLoading ? 'Downloading…' : 'Download report'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadPptx}
        disabled={pptxLoading}
      >
        <Presentation className="h-4 w-4" />
        {pptxLoading ? 'Preparing…' : 'Download PowerPoint'}
      </Button>
    </div>
  )
}