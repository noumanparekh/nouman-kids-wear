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

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Sanity is configured client-side
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    setIsConfigured(!!projectId)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading Studio...</p>
      </div>
    )
  }

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

  // When Sanity is configured, dynamically import and render the Studio
  // This is loaded lazily to avoid build issues when no credentials exist
  const StudioWithAuth = require('next-sanity/studio').NextStudio
  const config = require('@/../sanity.config').default
  
  return <StudioWithAuth config={config} />
}
