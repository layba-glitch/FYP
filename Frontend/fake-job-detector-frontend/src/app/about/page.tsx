"use client";
import { Cpu, Code2, Database, ShieldCheck, Terminal, User, Zap, Globe } from "lucide-react";
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.scanlineEffect} />
      
      <div className={styles.headerSection}>
        <div className={styles.statusBadge}>
          <Zap size={12} />
          <span>System Briefing</span>
        </div>
        <h2 className={styles.title}>Project Dossier</h2>
        <p className={styles.subtitle}>Architecture & Neural Defense Mission</p>
      </div>

      <div className={styles.mainGrid}>
        {/* LEFT: MISSION & SPECS */}
        <div className={styles.contentCard}>
          <div className={styles.cardGlow} />
          <h3 className={styles.cardTitle}>Operational Objective</h3>
          <p className={styles.missionText}>
            This platform serves as a neural defense layer against the rising tide of 
            employment fraud. By leveraging <b>Natural Language Processing (NLP)</b>, the engine 
            identifies linguistic anomalies and structural patterns common in fraudulent job 
            postings, providing real-time risk assessment for modern job seekers.
          </p>

          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <div className={styles.techIcon}><Code2 size={18} /></div>
              <div>
                <p className={styles.techLabel}>Frontend</p>
                <p className={styles.techValue}>Next.js 16 / Turbopack</p>
              </div>
            </div>
            <div className={styles.techItem}>
              <div className={styles.techIcon}><Terminal size={18} /></div>
              <div>
                <p className={styles.techLabel}>Backend</p>
                <p className={styles.techValue}>FastAPI / Python 3.10+</p>
              </div>
            </div>
            <div className={styles.techItem}>
              <div className={styles.techIcon}><Database size={18} /></div>
              <div>
                <p className={styles.techLabel}>Persistence</p>
                <p className={styles.techValue}>MongoDB Atlas</p>
              </div>
            </div>
            <div className={styles.techItem}>
              <div className={styles.techIcon}><Cpu size={18} /></div>
              <div>
                <p className={styles.techLabel}>AI Core</p>
                <p className={styles.techValue}>Hybrid LSTM Ensemble</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: DEVELOPER PROFILE */}
        <div className={styles.devCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarCircle}>
              <User size={30} />
            </div>
            <div className={styles.devInfo}>
              <p className={styles.devLabel}>Solo Project Developer</p>
              <h4 className={styles.devName}>Laiba Shazif</h4>
            </div>
          </div>

          <div className={styles.devStats}>
            <div className={styles.statLine}>
              <span>Status</span>
              <span className={styles.statValue}>Full-Stack Engineer</span>
            </div>
            <div className={styles.statLine}>
              <span>Affiliation</span>
              <span className={styles.statValue}>Computer Science Dept.</span>
            </div>
            <div className={styles.statLine}>
              <span>University Reg no.</span>
              <span className={styles.statValue}>2022-wis-4</span>
            </div>
            <div className={styles.statLine}>
              <span>Roll no.</span>
              <span className={styles.statValue}>092875</span>
            </div>
          </div>

          <div className={styles.sealContainer}>
            <ShieldCheck size={50} className={styles.securitySeal} />
            <p className={styles.sealText}>Architecture Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}