export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-card p-6">
      <div className="max-w-2xl space-y-4 text-center">
        <h1 className="text-3xl font-bold">Sanity Studio</h1>
        <p className="text-lg text-muted-foreground">
          CMS management for Nouman Kids Wear
        </p>
        
        <div className="mt-8 space-y-4 rounded-xl border border-border bg-background p-6 text-left">
          <h2 className="font-semibold">Setup Instructions:</h2>
          <ol className="list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
            <li>Create a Sanity project at <a href="https://sanity.io/manage" target="_blank" rel="noopener" className="text-blue-600 hover:underline">sanity.io/manage</a></li>
            <li>Copy .env.local.example to .env.local</li>
            <li>Add your project ID and dataset name to .env.local</li>
            <li>Restart the development server</li>
            <li>Visit this page again to access the Studio</li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          The website will work without Sanity CMS using local fallback data.
        </p>
      </div>
    </div>
  )
}
