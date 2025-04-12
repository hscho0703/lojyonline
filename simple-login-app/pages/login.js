import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(u => u.id === id && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/score');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>L.O.J.Y</h1>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid gold',
          backgroundColor: 'black',
          color: 'white'
        }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid gold',
          backgroundColor: 'black',
          color: 'white'
        }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'gold',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        로그인
      </button>
      <p style={{ marginTop: '1rem' }}>
        계정이 없으신가요?{' '}
        <Link href="/signup" style={{ color: '#FFD700', textDecoration: 'underline' }}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
