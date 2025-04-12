import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || password.length !== 4 || !/^\d{4}$/.test(password)) {
      alert("이름과 4자리 숫자 비밀번호를 정확히 입력해주세요.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = users.some((user) => user.name === name);
    if (isExist) {
      alert("이미 존재하는 이름입니다.");
      return;
    }

    const newUser = { name, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("회원가입이 완료되었습니다.");
    router.push("/login"); // ✅ 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>L.O.J.Y</h1>
      <div style={styles.card}>
        <h2 style={styles.title}>회원가입</h2>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="4자리 숫자 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignup} style={styles.button}>
          회원가입
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#FFD700",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#111",
    border: "2px solid #FFD700",
    borderRadius: "16px",
    padding: "2rem",
    textAlign: "center",
    width: "300px",
    boxShadow: "0 0 20px #FFD70088",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.7rem",
    marginBottom: "1rem",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #FFD700",
    backgroundColor: "#000",
    color: "#FFD700",
  },
  button: {
    padding: "0.7rem",
    width: "100%",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
