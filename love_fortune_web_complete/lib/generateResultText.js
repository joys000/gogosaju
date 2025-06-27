import mbtiProfiles from '../data/love-mbti-profiles';

export function generateResultText({ name, mbti, r1, r2, r3, r4, r5, totalScore }) {
  const profile = mbtiProfiles[mbti];

  if (!profile) return `MBTI 정보가 잘못되었습니다: ${mbti}`;

  return `🎉 ${name} 님의 2025년 연애 성향 진단 결과

💘 연애 MBTI 유형: ${mbti} - ${profile.title}

🌸 ${name} 님은 ${profile.summary} 스타일이에요.

${profile.description}

💞 잘 맞는 MBTI 유형: ${profile.bestMatch.join(', ')}

⚠️ 주의할 점: ${profile.caution}

📊 점수 기반 해석:
- 감정 표현력 (R1): ${r1}
- 집착 성향 (R2): ${r2}
- 연애 주도권 (R3): ${r3}
- 안정/설렘 균형 (R4): ${r4}
- 설렘 추구 성향 (R5): ${r5}
- 총점: ${totalScore}점`;
}
