import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "demo-1", verdict: "likely_fake", score: 88, created_at: new Date(Date.now() - 86400000).toISOString(), title: "Remote Data Entry (Suspicious)" },
    { id: "demo-2", verdict: "likely_legit", score: 18, created_at: new Date(Date.now() - 3 * 86400000).toISOString(), title: "Software Engineer (Company Careers)" },
  ]);
}
