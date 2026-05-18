// Supabase Edge Function: fetch-google-reviews
// Fetches reviews from Google Places API (server-side — API key never exposed to browser)

// @ts-ignore
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

interface GooglePlaceReview {
  author_name?: string
  text?: string
  rating?: number
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// @ts-ignore
serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    const { placeId } = await req.json()

    if (!placeId) {
      return new Response(JSON.stringify({ error: 'placeId is required' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    // @ts-ignore
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY')
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Google API key not configured on server' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name&language=en&reviews_sort=newest&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK') {
      return new Response(JSON.stringify({ error: `Google API error: ${data.status}`, detail: data.error_message }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    const reviews = (data.result?.reviews || []).map((r: GooglePlaceReview, i: number) => ({
      name: r.author_name || 'Anonymous',
      role: `Google Review`,
      content: r.text || '',
      rating: r.rating || 5,
      display_order: i + 1,
    }))

    return new Response(JSON.stringify({
      reviews,
      place_name: data.result?.name,
      overall_rating: data.result?.rating,
      total_ratings: data.result?.user_ratings_total,
    }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})

