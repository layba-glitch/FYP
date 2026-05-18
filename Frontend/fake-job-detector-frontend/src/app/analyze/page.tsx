"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Search, ShieldAlert, Cpu, Activity } from "lucide-react";
import clsx from "clsx";
import styles from './page.module.css';
import { analyzeJob } from "@/lib/api";

type PredictResponse = {
  final_label: "FAKE" | "REAL";
  final_confidence: number;
  dl_prob_fake: number;
  ml_prob_fake: number;
};

export default function AnalyzePage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobText, setJobText] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canAnalyze = useMemo(() => jobText.trim().length > 20, [jobText]);

  async function onAnalyze() {
    // 1. Clear previous state immediately to trigger the "Scanning" UI
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      // 2. Start the API call
      const data = await analyzeJob({ title: jobTitle, description: jobText, location: location });
      
      // 3. Artificial "Perception Delay" (800ms)
      // This ensures the futuristic scanner animation is seen by the user
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Neural connection failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.analyzeContainer}>
      <div className={styles.scannerGlow} />

      {/* LEFT: INPUT AREA */}
      <div className={styles.leftSection}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Cpu size={20} className={styles.headerIcon} />
            <div>
              <div className={styles.cardHeaderTitle}>Neural Input Portal</div>
              <div className={styles.cardHeaderSubtitle}>Provide job metadata for deep-scan analysis.</div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.fieldWrapper}>
              <label className={styles.inputLabel}>Position Title</label>
              <input 
                className={styles.inputField} 
                placeholder="e.g. Senior Backend Architect" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label className={styles.inputLabel}>Geographic Metadata</label>
              <input 
                className={styles.inputField} 
                placeholder="e.g. London, UK (Remote)" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label className={styles.inputLabel}>Linguistic Payload (Description)</label>
              <textarea 
                className={styles.textArea} 
                value={jobText} 
                onChange={(e) => setJobText(e.target.value)} 
                placeholder="Paste the full job description here for pattern recognition..." 
                rows={8} 
              />
            </div>

            <button 
              onClick={onAnalyze} 
              disabled={!canAnalyze || loading} 
              className={clsx(styles.button, canAnalyze && !loading ? styles.activeButton : styles.disabledButton)}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Activity size={18} />}
              {loading ? "PROCESSING SIGNALS..." : "INITIALIZE SCAN"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: RESULTS AREA */}
      <div className={styles.rightSection}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <ShieldAlert size={20} className={styles.headerIcon} />
            <div>
              <div className={styles.cardHeaderTitle}>Analysis HUD</div>
              <div className={styles.cardHeaderSubtitle}>Real-time model inference report.</div>
            </div>
          </div>

          {/* PRIORITY 1: LOADING SCANNER */}
          {loading ? (
            <div className={styles.emptyState}>
              <div className={styles.scanningLine} />
              <Loader2 className="animate-spin" size={40} color="#6366f1" />
              <p className={styles.scanningText}>Deconstructing linguistic syntax...</p>
            </div>
          ) : result ? (
            /* PRIORITY 2: ANALYSIS RESULT */
            <div className={styles.resultGrid}>
              <div className={clsx(styles.verdictBanner, result.final_label === "FAKE" ? styles.bannerFake : styles.bannerReal)}>
                {result.final_label === "FAKE" ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
                <div className={styles.verdictContent}>
                  <div className={styles.verdictTitle}>
                    {result.final_label === "FAKE" ? "THREAT IDENTIFIED" : "VERIFIED LEGITIMATE"}
                  </div>
                  <div className={styles.verdictSummary}>
                    {result.final_label === "FAKE" 
                      ? "High-confidence anomaly detected in posting structure." 
                      : "Semantic patterns match standard employment listings."}
                  </div>
                  <div className={styles.confidenceScore}>
                    Inference Confidence: <span className={styles.scoreValue}>{(result.final_confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className={styles.modelHud}>
                <span className={styles.hudTitle}>Probability Breakdown</span>
                
                <div className={styles.hudMetric}>
                  <div className={styles.progressLabel}>
                    <span>Deep Learning (LSTM)</span>
                    <span>{(result.dl_prob_fake * 100).toFixed(1)}%</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div 
                      className={clsx(styles.progressBarFill, result.dl_prob_fake > 0.5 ? styles.fillRed : styles.fillGreen)} 
                      style={{ width: `${result.dl_prob_fake * 100}%` }} 
                    />
                  </div>
                </div>

                <div className={styles.hudMetric}>
                  <div className={styles.progressLabel}>
                    <span>ML Statistical Core</span>
                    <span>{(result.ml_prob_fake * 100).toFixed(1)}%</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div 
                      className={clsx(styles.progressBarFill, result.ml_prob_fake > 0.5 ? styles.fillRed : styles.fillGreen)} 
                      style={{ width: `${result.ml_prob_fake * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* PRIORITY 3: IDLE STATE */
            <div className={styles.emptyState}>
              <div className={styles.idlePulse} />
              <p>System Ready. Waiting for data sequence...</p>
            </div>
          )}

          {error && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}