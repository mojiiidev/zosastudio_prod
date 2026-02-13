import { NextRequest, NextResponse } from "next/server";

/**
 * GraphQL proxy to avoid CORS issues when fetching from the
 * WordPress backend hosted on DigitalOcean.
 */
export async function POST(request: NextRequest) {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!wpUrl) {
    return NextResponse.json(
      { error: "WordPress GraphQL URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const wpResponse = await fetch(wpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: `WordPress responded with status ${wpResponse.status}` },
        { status: wpResponse.status }
      );
    }

    const data = await wpResponse.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown proxy error";
    console.error("GraphQL Proxy Error:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
