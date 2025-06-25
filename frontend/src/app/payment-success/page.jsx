"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
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
            ...styles.checkmarkContainer,
            opacity: showAnimation ? 1 : 0,
            transform: showAnimation ? "scale(1)" : "scale(0.5)",
          }}
        >
          <div style={styles.checkmark}>✓</div>
        </div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>Thank you for your purchase.</p>
        <button style={styles.button} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
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
  checkmarkContainer: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#4ade80",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    transition: "all 0.5s ease-out",
  },
  checkmark: {
    fontSize: "40px",
    color: "#ffffff",
  },
  title: {
    fontSize: "24px",
    color: "#1f2937",
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

export default SuccessPage;
