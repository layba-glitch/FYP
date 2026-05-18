"use client";
import { useEffect, useState } from "react";
import { Clock, Database, ShieldCheck, ShieldX, Terminal, SearchCode } from "lucide-react";
import styles from './page.module.css';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.historyContainer}>
      {/* Background Ambience */}
      <div className={styles.archiveGlow} />

      <div className={styles.headerSection}>
        <div className={styles.archiveBadge}>
          <Terminal size={14} />
          <span>Session Intelligence Log</span>
        </div>
        <h2 className={styles.historyTitle}>Archive Log</h2>
        <p className={styles.historySubtitle}>Reviewing historical pattern detections from the NLP engine.</p>
      </div>

      {loading ? (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinnerWrapper}>
            <Clock className={styles.spinningClock} size={40} />
          </div>
          <p className={styles.loadingText}>Synchronizing with Central Database...</p>
        </div>
      ) : (
        <div className={styles.historyList}>
          {history.length > 0 ? (
            history.map((item: any, index) => {
              const isFake = item.verdict === 'likely_fake' || item.verdict === 'FAKE';
              return (
                <div key={item.id || index} className={styles.historyItem}>
                  <div className={styles.itemGlow} />
                  <div className={styles.historyItemHeader}>
                    <div className={styles.titleWrapper}>
                      <SearchCode size={18} className={styles.itemIcon} />
                      <span className={styles.historyItemTitle}>
                        {item.title || "Untitled Sequence"}
                      </span>
                    </div>
                    <span className={styles.historyItemDate}>
                      {new Date(item.timestamp).toLocaleDateString()} <span className={styles.dateDivider}>|</span> {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  <div className={styles.historyItemDetails}>
                    <div className={`${styles.statusBadge} ${isFake ? styles.fakeBadge : styles.realBadge}`}>
                      {isFake ? <ShieldX size={14} /> : <ShieldCheck size={14} />}
                      <span>{isFake ? "THREAT DETECTED" : "VERIFIED CLEAR"}</span>
                    </div>
                    
                    <div className={styles.statsGroup}>
                      <span className={styles.statLabel}>CORE CONFIDENCE</span>
                      <span className={styles.scoreValue}>{item.score}%</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noHistory}>
              <Database size={60} className={styles.emptyIcon} />
              <p className={styles.emptyText}>Neural Archive is currently empty.</p>
              <span className={styles.emptySub}>Initialize a scan to populate system logs.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}