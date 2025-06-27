import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [scale, setScale] = useState(1);
  const [gender, setGender] = useState('');
  const router = useRouter();

  const handleGenderSelect = (selected) => {
    setGender(selected);
    localStorage.setItem(
      'userData',
      JSON.stringify({ ...(JSON.parse(localStorage.getItem('userData')) || {}), gender: selected })
    );
  };

  const handleContinue = () => {
    if (gender) router.push('/userinfo');
  };

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 1280;
      const baseHeight = 720;
      const scaleW = window.innerWidth / baseWidth;
      const scaleH = window.innerHeight / baseHeight;
      setScale(Math.min(scaleW, scaleH));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fce4ec',
      }}
    >
      <div
        style={{
          width: '1280px',
          height: '720px',
          backgroundImage: 'url(/MAIN.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '420px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '2rem',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            alignItems: 'center',
            zIndex: 1,
            width: '300px'
          }}
        >
          {/* 안내 텍스트 */}
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ff8663',
            textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            💖 성별을 선택해주세요 🎀
          </div>

          {/* 성별 선택 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => handleGenderSelect('male')}
              style={{
                padding: '10px 18px',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '9999px',
                background: gender === 'male' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : '#eee',
                color: gender === 'male' ? '#fff' : '#555',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: gender === 'male' ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              남자
            </button>
            <button
              onClick={() => handleGenderSelect('female')}
              style={{
                padding: '10px 18px',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '9999px',
                background: gender === 'female' ? 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' : '#eee',
                color: gender === 'female' ? '#fff' : '#555',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: gender === 'female' ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              여자
            </button>
          </div>

          {/* 계속하기 버튼 */}
          <button
            disabled={!gender}
            onClick={handleContinue}
            style={{
              marginTop: '0.5rem',
              padding: '10px 24px',
              fontSize: '1rem',
              background: gender ? 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              cursor: gender ? 'pointer' : 'not-allowed',
              opacity: gender ? 1 : 0.5,
              boxShadow: gender ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseDown={e => {
              if (gender) e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
