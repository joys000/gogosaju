import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Result() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      setUserData(data);
    } else {
      router.push('/'); // 데이터 없으면 메인으로 이동
    }
  }, []);

  if (!userData) return null;

  const {
    name, birth, hour, minute, calendar, gender, scores
  } = userData;

  // 성별에 따른 배경 이미지
  const bgImage = gender === 'female' ? '/RE_G.png' : '/RE_M.png';

  // 총점 계산
  const totalScore = Object.values(scores).reduce((sum, v) => sum + v, 0);

  // 각 항목 설명 매핑
  const explain = (value, group) => {
    const ranges = {
      high: value >= 16,
      mid: value >= 8 && value < 16,
      low: value < 8,
    };
    const texts = {
      Emotion: {
        high: "💬 감정 표현이 자연스러운 사람! 말하지 않아도 통하는 건 NO, 표현은 필수!",
        mid: "🌙 표현은 조금 서툴지만, 마음은 깊은 타입이에요. 차분하게 마음을 전하죠.",
        low: "🌫️ 감정보다 행동으로 보여주는 스타일. 말보단 진심을 믿는 쿨한 연애 선호!"
      },
      Attachment: {
        high: "🔥 상대에게 집중하는 스타일! 애정 표현도, 확인도 자주 하는 편이에요.",
        mid: "🌤️ 은근히 신경 쓰지만 지나치지 않는 균형 잡힌 스타일이에요.",
        low: "🍃 쿨하고 자유로운 연애를 선호해요. 구속은 NO, 믿음이 중요해요!"
      },
      Leadership: {
        high: "🧭 연애의 흐름을 리드하는 타입! 확신과 추진력으로 이끌어가는 매력 💪",
        mid: "🫶 함께 맞춰가는 걸 좋아하는 조율형 연애러! 대화와 존중이 기본이에요.",
        low: "🙈 상대가 먼저 다가와주는 게 편한 타입이에요. 서서히 천천히 알아가요."
      },
      Stability: {
        high: "🌳 평온하고 안정적인 사랑을 원하는 타입. 오래 갈수록 깊어지는 연애 선호!",
        mid: "🍀 안정도 좋지만 때때로 자극도 필요한 스타일. 상황에 따라 균형을 맞춰요.",
        low: "🌪️ 설렘과 자극을 쫓는 모험형 연애러! 반복되는 일상엔 easily bored 🌀"
      },
      Excitement: {
        high: "🎢 늘 새로운 자극과 이벤트를 원해요! 드라마틱한 사랑을 꿈꾸는 타입 🎇",
        mid: "🌓 설렘은 좋지만 안정도 중요해요. 감성적이지만 현실감도 갖춘 균형형.",
        low: "🛋️ 조용하고 편안한 관계가 최고! 과한 자극보다 잔잔한 안정에 끌리는 편이에요."
      }
    };

    return ranges.high ? texts[group].high :
           ranges.mid ? texts[group].mid : texts[group].low;
  };

  // 생년 → 사주 기반 분석
  const birthYear = parseInt(birth.split('-')[0]);
  const birthMonth = parseInt(birth.split('-')[1]);
  const hourInt = parseInt(hour);

  const sajuTexts = {
    year: birthYear <= 2002 ? 
      "✨ 변화를 두려워하지 않는 연애 스타일! 새로운 인연에도 적극적인 해예요." :
      "💞 순수하고 감성적인 연애 기운이 강한 시기! 첫사랑 같은 감정이 찾아올지도 몰라요.",
    season: birthMonth >= 3 && birthMonth <= 5 ? "🌸 따뜻하고 감정이 풍부한 타입!" :
            birthMonth >= 6 && birthMonth <= 8 ? "☀️ 열정적이고 표현력이 풍부해요!" :
            birthMonth >= 9 && birthMonth <= 11 ? "🍂 신중하고 성숙한 연애 선호!" :
            "❄️ 차분하고 깊이 있는 사랑을 해요.",
    time: hourInt < 12 ? "🌅 긍정적이고 밝은 연애 에너지!" :
          hourInt < 18 ? "☀️ 대화와 공감을 중시해요." :
          hourInt < 24 ? "🌆 감성적이고 다정한 스타일." : "🌌 혼자만의 시간을 중요시해요.",
    calendar: calendar === '양력' ? 
      "💫 현실적이고 논리적인 연애 스타일!" : 
      "🌙 감성적이고 직관적인 연애 스타일이에요."
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
      padding: '2rem',
      color: '#fff',
      overflowY: 'auto'
    }}>
      <h1 style={{ fontSize: '2rem' }}>🎉 {name}님의 연애 성향 결과</h1>
      <h2 style={{ marginTop: '1rem' }}>💘 총점: {totalScore}점</h2>

      <div style={{ marginTop: '1.5rem' }}>
        <p><strong>감정 표현력:</strong> {explain(scores.Emotion, 'Emotion')}</p>
        <p><strong>집착 성향:</strong> {explain(scores.Attachment, 'Attachment')}</p>
        <p><strong>연애 주도권:</strong> {explain(scores.Leadership, 'Leadership')}</p>
        <p><strong>안정성 추구:</strong> {explain(scores.Stability, 'Stability')}</p>
        <p><strong>설렘 추구:</strong> {explain(scores.Excitement, 'Excitement')}</p>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '1rem' }}>
        <h3>🔮 사주 기반 연애운</h3>
        <p>{sajuTexts.year}</p>
        <p>{sajuTexts.season}</p>
        <p>{sajuTexts.time}</p>
        <p>{sajuTexts.calendar}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => router.push('/')} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>처음으로</button>
      </div>
    </div>
  );
}
