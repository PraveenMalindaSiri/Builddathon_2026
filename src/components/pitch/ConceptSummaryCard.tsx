import { Card } from '@/components/common/Card'
import type { ConceptSummary } from '@/types/pitch'

type ConceptSummaryCardProps = {
  data: ConceptSummary
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-300">{value}</dd>
    </div>
  )
}

export function ConceptSummaryCard({ data }: ConceptSummaryCardProps) {
  return (
    <Card>
      {data.nameSuggestion && (
        <p className="text-sm font-medium text-blue-400">{data.nameSuggestion}</p>
      )}
      <h3 className="mt-1 text-xl font-semibold text-slate-100">{data.oneLineSummary}</h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">{data.summary}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {data.targetCustomer && <Field label="Target customer" value={data.targetCustomer} />}
        {data.problem && <Field label="Problem" value={data.problem} />}
        {data.solution && <Field label="Solution" value={data.solution} />}
        {data.businessModel && <Field label="Business model" value={data.businessModel} />}
      </dl>
    </Card>
  )
}
