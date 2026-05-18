"use client";  // Mark this file as a client-side component

import { useState, useEffect } from "react";

export default function ClientComponent() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  // Set the current year only on the client-side
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());  // Only runs on the client side
  }, []);

  return (
    <div>
      {currentYear ? `© ${currentYear} Fake Job Detector` : "Loading..."}
    </div>
  );
}
