"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [scoreInput, setScoreInput] = useState("");
  const [file, setFile] = useState(null);

  // 사용자 목록 불러오기
  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);

  // 점수 추가
  const handleScoreSubmit = () => {
    if (!selectedUser || isNaN(scoreInput)) return;
    const updatedUsers = users.map((user) => {
      if (user.name === selectedUser) {
        const newScore = (user.score || 0) + Number(scoreInput);
        return { ...user, score: newScore };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setScoreInput("");
    setSelectedUser("");
    setCurrentScore(0);
  };

  // 회원 삭제
  const handleDeleteUser = (name) => {
    const filtered = users.filter((user) => user.name !== name);
    setUsers(filtered);
    localStorage.setItem("users", JSON.stringify(filtered));
  };

  // 사진 업로드
  const handlePhotoUpload = () => {
    if (!selectedUser || !file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUsers = users.map((user) =>
        user.name === selectedUser ? { ...user, photo: reader.result } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setFile(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>L.O.J.Y 관리자 페이지</h1>

      {/* 회원 선택 */}
      <select
        style={styles.select}
        onChange={(e) => {
          const name = e.target.value;
          setSelectedUser(name);
          const found = users.find((u) => u.name === name);
          setCurrentScore(found?.score || 0);
        }}
        value={selectedUser}
      >
        <option value="">회원 선택</option>
        {users.map((user) => (
          <option key={user.name} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>

      {/* 사진 업로드 */}
      <div style={styles.card}>
        <h2 style={styles.title}>회원 사진 업로드</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handlePhotoUpload} style={styles.button}>
          사진 추가
        </button>
      </div>

      {/* 점수 입력 */}
      <div style={styles.card}>
        <h2 style={styles.title}>회원 점수 입력</h2>

        {selectedUser && (
          <div style={{ color: "#FFD700", marginBottom: "1rem" }}>
            현재 점수: <strong>{currentScore}</strong>
          </div>
        )}

        <input
          type="number"
          placeholder="추가할 점수"
          value={scoreInput}
          onChange={(e) => setScoreInput(e.target.value)}
          style={styles.input}
        />

        {selectedUser && scoreInput !== "" && !isNaN(scoreInput) && (
          <div style={{ color: "#FFD700", marginBottom: "1rem" }}>
            합산 점수: <strong>{currentScore + Number(scoreInput)}</strong>
          </div>
        )}

        <button onClick={handleScoreSubmit} style={styles.button}>
          점수 추가
        </button>
      </div>

      {/* 회원 삭제 */}
      <div style={styles.card}>
        <h2 style={styles.title}>회원 삭제</h2>
        {users.map((user) => (
          <div key={user.name} style={styles.userItem}>
            <span>{user.name}</span>
            <button onClick={() => handleDeleteUser(user.name)} style={styles.deleteButton}>
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "black",
    minHeight: "100vh",
    color: "white",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  logo: {
    fontSize: "2.5rem",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #FFD700",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#FFD700",
  },
  select: {
    padding: "0.5rem",
    marginBottom: "1rem",
    width: "100%",
  },
  input: {
    padding: "0.5rem",
    width: "100%",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#FFD700",
    border: "none",
    color: "black",
    cursor: "pointer",
    borderRadius: "0.5rem",
  },
  userItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
};
