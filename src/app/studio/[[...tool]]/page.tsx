'use client'

/**
 * Sanity Studio route - conditionally loads Studio when configured.
 * 
 * Without Sanity credentials: Shows setup instructions
 * With Sanity credentials: Loads Sanity Studio with authentication
 * 
 * SECURITY: Studio authentication is handled by Sanity (no custom login).
 */

import { useEffect, useState } from 'react'
import dynamicImport from 'next/dynamic'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

// Dynamically import Studio components to avoid build issues
const NextStudio = dynamicImport(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading Studio...</p>
      </div>
    ),
  }
)

// Get Sanity config at runtime
function getSanityConfig() {
  try {
    return require('@/../sanity.config').default
  } catch (error) {
    console.error('Failed to load Sanity config:', error)
    return null
  }
}

export default function StudioPage() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if Sanity is configured by trying to access the public env var
    // This runs client-side and checks if the config was injected by Next.js
    const config = getSanityConfig()
    const hasProjectId = config?.projectId && config.projectId !== ''
    setIsConfigured(hasProjectId)
  }, [])

  // Loading state
  if (isConfigured === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading Studio...</p>
      </div>
    )
  }

  // Not configured - show setup instructions
  if (!isConfigured) {
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
              <li>Create a Sanity project at <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">sanity.io/manage</a></li>
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

  // Configured - load Studio
  const config = getSanityConfig()
  return <NextStudio config={config} />
}
