import { Card } from '@/components/common/Card'
import type { MarketingStarterPack } from '@/types/pitch'

type MarketingPackCardProps = {
  data: MarketingStarterPack
}

export function MarketingPackCard({ data }: MarketingPackCardProps) {
  return (
    <div className="space-y-4">
      <Card>
        <h4 className="mb-3 font-semibold text-slate-100">Taglines</h4>
        <ul className="space-y-2">
          {(data.taglines ?? []).map((t) => (
            <li key={t} className="text-sm text-slate-300">"{t}"</li>
          ))}
        </ul>
      </Card>

      {(data.heroHeadline || data.heroSubheadline) && (
        <Card>
          <h4 className="mb-3 font-semibold text-slate-100">Hero copy</h4>
          {data.heroHeadline && (
            <p className="text-lg font-semibold text-slate-100">{data.heroHeadline}</p>
          )}
          {data.heroSubheadline && (
            <p className="mt-1 text-sm text-slate-400">{data.heroSubheadline}</p>
          )}
        </Card>
      )}

      {(data.socialPosts ?? []).length > 0 && (
        <Card>
          <h4 className="mb-3 font-semibold text-slate-100">Social posts</h4>
          <div className="space-y-4">
            {data.socialPosts.map((post) => (
              <div key={`${post.platform}-${post.copy.slice(0, 20)}`}>
                <p className="text-xs font-medium uppercase text-blue-400">{post.platform}</p>
                <p className="mt-1 text-sm text-slate-300">{post.copy}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {data.coldEmail && (
        <Card>
          <h4 className="mb-3 font-semibold text-slate-100">Cold email</h4>
          <p className="text-sm font-medium text-slate-200">Subject: {data.coldEmail.subject}</p>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-400">{data.coldEmail.body}</pre>
        </Card>
      )}

      {data.pressRelease && (
        <Card>
          <h4 className="mb-3 font-semibold text-slate-100">Press release</h4>
          <p className="text-sm text-slate-300">{data.pressRelease}</p>
        </Card>
      )}

      {(data.seoKeywords ?? []).length > 0 && (
        <Card>
          <h4 className="mb-3 font-semibold text-slate-100">SEO keywords</h4>
          <div className="flex flex-wrap gap-2">
            {(data.seoKeywords ?? []).map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-400"
              >
                {kw}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
