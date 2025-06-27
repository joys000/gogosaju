import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const maleQuestions = [
  "첫눈에 반하는 연애가 좋다고 생각한다.",
  "연락은 하루에 몇 번이라도 자주 하는 게 좋다.",
  "밀당은 연애에서 꼭 필요하다고 생각한다.",
  "연애보다 자기계발이 더 우선이다.",
  "연인에게 경제적인 부분은 어느 정도 보여줘야 한다.",
  "SNS에 연애를 공개하는 건 부담스럽다.",
  "외모는 연애를 시작할 때 중요한 요소다.",
  "감정 표현을 자주 하는 것이 좋다고 생각한다.",
  "연인이 우울할 때 말없이 곁에 있는 편이다.",
  "연애할 땐 사적인 시간도 중요하다고 느낀다.",
  "여자친구가 이성 친구를 만나는 건 신경 쓰인다.",
  "연인의 의견에 맞춰주는 편이다.",
  "기념일을 잘 챙기는 편이다.",
  "연애가 삶의 큰 행복 중 하나라고 느낀다.",
  "금전적인 부담이 큰 연애는 꺼려진다.",
  "연애 초반엔 약간의 질투는 자연스럽다고 생각한다.",
  "연애할 땐 자주 보고 싶고 연락하고 싶다.",
  "여자친구의 감정 변화에 민감한 편이다.",
  "연인의 SNS 활동이 신경 쓰인다.",
  "연인과 함께 취미를 공유하고 싶다.",
  "가볍게 시작한 연애도 진지해질 수 있다고 생각한다.",
  "상대가 나보다 리드하는 스타일이면 부담스럽다.",
  "연애는 서로가 성장할 수 있는 관계여야 한다.",
  "싸우더라도 무조건 먼저 사과하는 건 어렵다.",
  "내가 먼저 고백하는 경우가 많다."
];
const femaleQuestions = [
  "연애할 땐 연락이 자주 와야 안정감을 느낀다.",
  "외모보다 말투나 성격이 더 중요하다.",
  "사소한 서프라이즈를 좋아하는 편이다.",
  "연인이 나의 감정에 공감해주길 바란다.",
  "연애를 시작하기 전에 오래 알아가는 시간이 필요하다.",
  "관심 없는 사람에게는 철벽을 친다.",
  "나를 서포트해주는 연인이 이상형이다.",
  "연인이 게임이나 취미에 너무 몰두하면 서운하다.",
  "상대의 경제력이 연애에서 어느 정도 중요하다.",
  "연애는 서로의 감정을 잘 알아가는 과정이라고 생각한다.",
  "연인의 SNS를 자주 확인하는 편이다.",
  "썸 기간이 너무 짧으면 불안하다.",
  "연애 중에도 혼자만의 시간이 필요하다.",
  "연인이 내 주변 사람들과 잘 어울렸으면 좋겠다.",
  "감정을 솔직하게 표현하는 편이다.",
  "연인이 다른 이성과 연락하는 것은 신경 쓰인다.",
  "연애는 설렘보다 안정감이 더 중요하다.",
  "데이트 비용은 나누는 것이 좋다고 생각한다.",
  "상대방이 적극적인 스타일일수록 끌린다.",
  "귀여운 애정 표현을 즐기는 편이다.",
  "연애에서 상대가 너무 무심하면 오래 못 간다.",
  "연애는 내 자존감을 높여주는 관계여야 한다.",
  "상대방의 센스 있는 말투나 대화가 매력적이다.",
  "기념일이나 특별한 날을 잘 챙기는 편이다.",
  "상대방의 배려심이 없으면 정이 뚝 떨어진다."
];

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
