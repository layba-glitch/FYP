"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

type Report = {
  id: string;
  verdict: string;
  score: number;
  confidence: number;
  summary: string;
  risk_factors: { label: string; severity: string; detail: string }[];
  evidence: { text: string; kind: string }[];
  created_at: string;
};

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/report/${encodeURIComponent(id)}`);
        const data = (await res.json()) as Report;
        setReport(data);
      } catch {
        setReport(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <div className="text-base font-semibold">Report</div>
        <div className="mt-1 text-sm text-zinc-600">Full analysis details.</div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : !report ? (
        <div className="text-sm text-zinc-600">Report not found.</div>
      ) : (
        <div className="grid gap-4">
          <div className="rounded-2xl border border-zinc-200 p-4">
            <div className="text-xs text-zinc-600">Report ID</div>
            <div className="mt-1 font-semibold">{report.id}</div>
            <div className="mt-2 text-sm text-zinc-700">{report.summary}</div>
            <div className="mt-2 text-sm text-zinc-600">
              Verdict: <span className="text-zinc-900">{report.verdict}</span> • Score:{" "}
              <span className="text-zinc-900">{report.score}/100</span> • Confidence:{" "}
              <span className="text-zinc-900">{Math.round(report.confidence * 100)}%</span>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-semibold">Risk factors</div>
            {report.risk_factors?.length ? (
              report.risk_factors.map((rf, i) => (
                <div key={i} className="rounded-2xl border border-zinc-200 p-3">
                  <div className="text-sm font-medium">{rf.label}</div>
                  <div className="text-xs text-zinc-500">Severity: {rf.severity}</div>
                  <div className="mt-1 text-sm text-zinc-700">{rf.detail}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-zinc-600">None.</div>
            )}
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-semibold">Evidence</div>
            {report.evidence?.length ? (
              report.evidence.map((ev, i) => (
                <div key={i} className="rounded-2xl border border-zinc-200 p-3">
                  <div className="text-xs text-zinc-500">{ev.kind}</div>
                  <div className="mt-1 text-sm">{ev.text}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-zinc-600">None.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
