import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    const user = users.find(
      (u) => u.name === trimmedName && u.password === trimmedPassword
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/score");
    } else {
      alert("이름 또는 비밀번호가 옳지 않습니다.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>L.O.J.Y</h1>
      <div style={styles.card}>
        <h2 style={styles.header}>로그인</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="숫자 4자리 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            로그인
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="/signup" style={{ color: "#d4af37", fontSize: "14px" }}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f0f0f",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Georgia', serif",
  },
  title: {
    fontSize: "60px",
    color: "#d4af37",
    textShadow: "0 0 15px #d4af37",
    marginBottom: "30px",
    textAlign: "center",
  },
  card: {
    background: "#111",
    border: "2px solid #d4af37",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 0 25px #d4af37",
    width: "300px",
  },
  header: {
    color: "white",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    border: "1px solid #d4af37",
    borderRadius: "8px",
    background: "#000",
    color: "#fff",
  },
  button: {
    padding: "10px",
    backgroundColor: "#d4af37",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
