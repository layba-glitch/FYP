import "./globals.css";  
import './layout.css';        
import ClientComponent from "./ClientComponent";
import { Metadata } from "next"; 
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fake Job Detector",
  description: "NLP-based fake job detection system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* BACKGROUND LAYER - Fixed to the back */}
        <div className="fixed-background-container">
          <div className="glow-orb" />
          <div className="grid-overlay" />
          <div className="floating-node" style={{ top: '15%', left: '8%', width: '200px', height: '200px' }}></div>
          <div className="floating-node" style={{ top: '45%', right: '12%', width: '150px', height: '150px', animationDelay: '-2s' }}></div>
          <div className="floating-node" style={{ bottom: '25%', left: '15%', width: '180px', height: '180px', animationDelay: '-5s' }}></div>
        </div>

        <div className="app-wrapper">
          <header className="main-header">
            <div className="header-inner">
              <Link href="/" className="logo-group" style={{ textDecoration: 'none' }}>
                <div className="logo-icon">
                  <span>FJ</span>
                </div>
                <div className="brand-info">
                  <span className="brand-name">Fake Job Detector</span>
                  <span className="brand-tagline">Secure NLP Analysis</span>
                </div>
              </Link>

              <nav className="nav-dock">
                <Nav href="/">Home</Nav>
                <Nav href="/analyze">Analyze</Nav>
                <Nav href="/history">History</Nav>
                <Nav href="/about">About</Nav>
              </nav>
            </div>
          </header>

          <main className="page-content">
            {children} 
          </main>

          <footer className="main-footer">
            <div className="footer-container">
               <div className="footer-line" />
               <div className="footer-bottom">
                 <p className="footer-text">© 2026 Fake Job Detector | Core Engine v1.0</p>
                 <ClientComponent /> 
               </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

function Nav({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="dock-link">
      {children}
    </Link>
  );
}