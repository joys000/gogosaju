import { useState } from 'react';
import { useRouter } from 'next/router';

export default function UserInfo() {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [hour, setHour] = useState('');
  const [calendar, setCalendar] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (name && birth && hour && calendar) {
      const gender = JSON.parse(localStorage.getItem('userData'))?.gender || 'male';
      const userData = {
        name,
        birth,
        hour,
        calendar: calendar === 'solar' ? '양력' : '음력',
        gender,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      router.push('/survey');
    }
  };

  const timeOptions = [
    { label: '자시 (23~01시)', value: '자시' },
    { label: '축시 (01~03시)', value: '축시' },
    { label: '인시 (03~05시)', value: '인시' },
    { label: '묘시 (05~07시)', value: '묘시' },
    { label: '진시 (07~09시)', value: '진시' },
    { label: '사시 (09~11시)', value: '사시' },
    { label: '오시 (11~13시)', value: '오시' },
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/MAIN.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        borderRadius: '2rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: 'clamp(280px, 90vw, 450px)',
        zIndex: 1,
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
          color: '#ff8663',
          fontWeight: '700',
          textAlign: 'center',
        }}>🌟 정보를 입력해주세요 🌟</h2>

        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '1rem',
            border: '1px solid #ccc',
          }}
        />

        <input
          type="date"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '1rem',
            border: '1px solid #ccc',
          }}
        />

        <div style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
        }}>
          {timeOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setHour(value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.9rem',
                border: hour === value ? '2px solid #ff758c' : '1px solid #ccc',
                background: hour === value ? '#ffebee' : '#fff',
                color: '#333',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => setCalendar('solar')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              fontWeight: 'bold',
              background: calendar === 'solar' ? 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' : '#eee',
              color: calendar === 'solar' ? '#fff' : '#333',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            양력
          </button>
          <button
            onClick={() => setCalendar('lunar')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              fontWeight: 'bold',
              background: calendar === 'lunar' ? 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' : '#eee',
              color: calendar === 'lunar' ? '#fff' : '#333',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            음력
          </button>
        </div>

        <button
          disabled={!(name && birth && hour && calendar)}
          onClick={handleStart}
          style={{
            marginTop: '1rem',
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            background: !(name && birth && hour && calendar)
              ? '#ccc'
              : 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            cursor: !(name && birth && hour && calendar) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: !(name && birth && hour && calendar) ? 'none' : '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          설문 시작하기
        </button>
      </div>
    </div>
  );
}
