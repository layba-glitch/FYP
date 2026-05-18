import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Background Layers */}
      <div className={styles.glowOrb} />
      <div className={styles.gridOverlay} />
      
      {/* Floating Decorative Nodes */}
      <div className={styles.floatingNode} style={{ top: '15%', left: '8%', width: '200px', height: '200px' }}></div>
      <div className={styles.floatingNode} style={{ top: '45%', right: '12%', width: '150px', height: '150px', animationDelay: '-2s' }}></div>
      <div className={styles.floatingNode} style={{ bottom: '25%', left: '15%', width: '180px', height: '180px', animationDelay: '-5s' }}></div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Next-Gen NLP Detection</div>
          
          <h1 className={styles.glitchTitle} data-text="Fake Job Detector">
            Fake Job Detector
          </h1>
          
          <p className={styles.heroSubtext}>
            Shielding job seekers with deep-learning neural networks. 
            Analyze job postings for fraudulent signals in real-time.
          </p>
          
          <div className={styles.buttonGroup}>
            <Link href="/analyze" className={styles.primaryBtn}>
              <span className={styles.btnText}>Start Analysis</span>
              <div className={styles.btnGlow} />
            </Link>
            
            <Link href="/history" className={styles.secondaryBtn}>
              View History
            </Link>
          </div>
        </div>
        
        <div className={styles.scrollIndicatorContainer}>
          <div className={styles.scrollIndicator}>
            <span>Explore Intelligence</span>
            <div className={styles.mouseWheel}></div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>The Process</h2>
        <div className={styles.howItWorks}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>01</div>
            <h3>Input Details</h3>
            <p>Paste the job description or URL into the detector for scanning.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>02</div>
            <h3>NLP Scanning</h3>
            <p>Our neural networks scan for linguistic inconsistencies and red flags.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>03</div>
            <h3>Risk Report</h3>
            <p>Get a detailed confidence score and automated threat analysis.</p>
          </div>
        </div>
      </section>

      {/* Advanced Capabilities Section */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionTitle}>Advanced Capabilities</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🛡️</span>
            <h4>Pattern Recognition</h4>
            <p>Detects common linguistic markers used by fraudulent entities with high precision.</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>⚡</span>
            <h4>Real-time Processing</h4>
            <p>Results delivered in milliseconds using optimized high-performance backends.</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>📊</span>
            <h4>Confidence Scoring</h4>
            <p>Deep learning models provide a granular probability score for every posting.</p>
          </div>
          <div className={styles.featureItem}>
            {/* Styled Lock Icon */}
            <span className={`${styles.featureIcon} ${styles.lockIcon}`}>🔐</span>
            <h4>Secure Analysis</h4>
            <p>Your data is processed through encrypted channels without being stored.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footerLine}>
        <div className={styles.footerContent}>
          <span>System Status: Optimal</span>
          <div className={styles.pulseDot} />
        </div>
      </footer>
    </main>
  );
}