
import { NextRequest, NextResponse } from 'next/server';

/**
 * Production-Grade GraphQL Proxy
 * 
 * Why use this?
 * 1. Security: Hides the WordPress URL from the client.
 * 2. CORS: Bypasses all Cross-Origin Resource Sharing restrictions.
 * 3. SSL: Prevents Mixed Content blocks if WordPress is on HTTP.
 */
export async function POST(req: NextRequest) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!WP_URL) {
    console.error("[Proxy Error] NEXT_PUBLIC_WORDPRESS_URL is missing in environment variables.");
    return NextResponse.json(
      { errors: [{ message: "Backend configuration error. Please check server environment variables." }] },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    // Use a short timeout for better UX - don't hang if WP is down
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(WP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ZosaLaw-Headless-Frontend',
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Proxy Error] WordPress responded with ${response.status}: ${errorText}`);
      return NextResponse.json(
        { errors: [{ message: `WordPress unreachable (${response.status})` }] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    let errorMessage = "Internal Server Error";
    
    if (error.name === 'AbortError') {
      errorMessage = "WordPress request timed out.";
    } else if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
      errorMessage = "Could not connect to WordPress. Check if the server is running.";
    }

    console.error("[Proxy Fatal Error]:", error.message);
    return NextResponse.json(
      { errors: [{ message: errorMessage }] },
      { status: 502 }
    );
  }
}
