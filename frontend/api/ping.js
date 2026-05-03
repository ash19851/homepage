// Vercel serverless function — pinged by cron every 10 min to prevent Render sleep
export default async function handler() {
  try {
    const res = await fetch('https://homepage-ycx9.onrender.com/api/public/site-config', {
      signal: AbortSignal.timeout(15000),
    })
    return new Response(JSON.stringify({ ok: true, status: res.status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
