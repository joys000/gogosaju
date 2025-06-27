import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import surveyQuestions from '../data/survey_questions.json';

const { male: maleQuestions, female: femaleQuestions } = surveyQuestions;

export default function Survey() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.gender) {
      setUserData(data);
    } else {
      router.push('/');
    }
  }, []);

  if (!userData) return null;

  const { gender } = userData;
  const questions = gender === 'female' ? femaleQuestions : maleQuestions;
  const bgImage = gender === 'female' ? '/Q_GIRL.png' : '/Q_MAN.png';
  const percentage = Math.round(((step + 1) / questions.length) * 100);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      const scores = {
        Emotion: newAnswers.slice(0, 5).reduce((a, b) => a + b, 0),
        Attachment: newAnswers.slice(5, 10).reduce((a, b) => a + b, 0),
        Leadership: newAnswers.slice(10, 15).reduce((a, b) => a + b, 0),
        Stability: newAnswers.slice(15, 20).reduce((a, b) => a + b, 0),
        Excitement: newAnswers.slice(20, 25).reduce((a, b) => a + b, 0),
      };
      const updated = { ...userData, scores };
      localStorage.setItem('userData', JSON.stringify(updated));
      router.push('/result');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '2rem',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem'
      }}>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ff758c' }}>
          {step + 1} / {questions.length} 문항 ({percentage}% 완료)
        </div>

        <div style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          fontWeight: '600',
          color: '#333'
        }}>{questions[step]}</div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {["매우 그렇다", "그렇다", "보통이다", "아니다", "전혀 아니다"].map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i + 1)}
              style={{
                padding: '0.8rem',
                width: '100%',
                fontSize: '1rem',
                borderRadius: '9999px',
                border: '1px solid #ccc',
                backgroundColor: answers[step] === (i + 1) ? '#fce4ec' : '#fff',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={handleBack} style={{ fontSize: '0.9rem', background: '#ddd', borderRadius: '1rem', padding: '0.5rem 1rem' }}>이전</button>
          <button onClick={() => router.push('/')} style={{ fontSize: '0.9rem', background: '#eee', borderRadius: '1rem', padding: '0.5rem 1rem' }}>처음으로</button>
        </div>
      </div>
    </div>
  );
}
