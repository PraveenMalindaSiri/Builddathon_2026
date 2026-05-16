import { Card } from '@/components/common/Card'
import type { MarketingStarterPack } from '@/types/pitch'

type MarketingPackCardProps = {
  data: MarketingStarterPack
}

export function MarketingPackCard({ data }: MarketingPackCardProps) {
  return (
    <div className="space-y-4">
      <Card>
        <h4 className="mb-3 font-semibold text-ink">Taglines</h4>
        <ul className="space-y-2">
          {(data.taglines ?? []).map((t) => (
            <li key={t} className="text-sm text-ink-soft">"{t}"</li>
          ))}
        </ul>
      </Card>

      {(data.heroHeadline || data.heroSubheadline) && (
        <Card>
          <h4 className="mb-3 font-semibold text-ink">Hero copy</h4>
          {data.heroHeadline && (
            <p className="text-lg font-semibold text-ink">{data.heroHeadline}</p>
          )}
          {data.heroSubheadline && (
            <p className="mt-1 text-sm text-ink-muted">{data.heroSubheadline}</p>
          )}
        </Card>
      )}

      {(data.socialPosts ?? []).length > 0 && (
        <Card>
          <h4 className="mb-3 font-semibold text-ink">Social posts</h4>
          <div className="space-y-4">
            {data.socialPosts.map((post) => (
              <div key={`${post.platform}-${post.copy.slice(0, 20)}`}>
                <p className="text-xs font-medium uppercase text-accent">{post.platform}</p>
                <p className="mt-1 text-sm text-ink-soft">{post.copy}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {data.coldEmail && (
        <Card>
          <h4 className="mb-3 font-semibold text-ink">Cold email</h4>
          <p className="text-sm font-medium text-ink-soft">Subject: {data.coldEmail.subject}</p>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-ink-muted">{data.coldEmail.body}</pre>
        </Card>
      )}

      {data.pressRelease && (
        <Card>
          <h4 className="mb-3 font-semibold text-ink">Press release</h4>
          <p className="text-sm text-ink-soft">{data.pressRelease}</p>
        </Card>
      )}

      {(data.seoKeywords ?? []).length > 0 && (
        <Card>
          <h4 className="mb-3 font-semibold text-ink">SEO keywords</h4>
          <div className="flex flex-wrap gap-2">
            {(data.seoKeywords ?? []).map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-border bg-void px-3 py-1 text-xs text-ink-muted"
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
