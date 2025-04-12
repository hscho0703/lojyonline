import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ScorePage() {
  const [user, setUser] = useState(null);
  const [rank, setRank] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const photos = JSON.parse(localStorage.getItem("photos") || "{}"); // 관리자 올린 사진들

    if (!currentUser) {
      router.push("/login");
      return;
    }

    const sortedUsers = [...users].sort((a, b) => b.score - a.score);
    const userRank = sortedUsers.findIndex((u) => u.name === currentUser.name) + 1;

    const photoUrl = photos[currentUser.name] || null;

    setUser({ ...currentUser, photo: photoUrl });
    setRank(userRank);
  }, []);

  if (!user) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>L.O.J.Y</h1>
      <div style={styles.card}>
        <h2 style={styles.header}>내 점수</h2>
        {user.photo && (
          <img
            src={user.photo}
            alt="회원 사진"
            style={{ width: "150px", borderRadius: "10px", marginBottom: "20px" }}
          />
        )}
        <p style={styles.info}>이름: {user.name}</p>
        <p style={styles.info}>점수: {user.score}</p>
        <p style={styles.info}>등수: {rank}등</p>
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
    color: "#fff",
    textAlign: "center",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  info: {
    fontSize: "18px",
    margin: "8px 0",
  },
};
