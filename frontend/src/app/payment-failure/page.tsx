// pages/cancel.js
"use client";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const CancelPage = () => {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShowAnimation(true));
  }, []);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.card,
          opacity: showAnimation ? 1 : 0,
          transform: showAnimation ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div
          style={{
            ...styles.iconContainer,
            opacity: showAnimation ? 1 : 0,
            transform: showAnimation ? "scale(1)" : "scale(0.5)",
          }}
        >
          <div style={styles.cross}>×</div>
        </div>
        <h1 style={styles.title}>Payment Cancelled</h1>
        <p style={styles.message}>It looks like you cancelled the payment.</p>
        <button style={styles.button} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #fcebea, #f9d2cd)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px 30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "90%",
    transition: "all 0.6s ease-out",
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#f87171",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    transition: "all 0.5s ease-out",
  },
  cross: {
    fontSize: "40px",
    color: "#ffffff",
    fontWeight: "bold",
  },
  title: {
    fontSize: "24px",
    color: "#b91c1c",
    marginBottom: "12px",
  },
  message: {
    fontSize: "16px",
    color: "#4b5563",
    lineHeight: "1.5",
    marginBottom: "24px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#111928",
    color: "#ffffff",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};


export default CancelPage;
