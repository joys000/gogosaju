// pages/result.js
import { useState } from 'react';
import Image from 'next/image';
import resultMaleBg from '../public/RE_M.png';
import resultFemaleBg from '../public/RE_G.png';
import mbtiProfiles from '../data/love-mbti-profiles';

export default function ResultPage({ userInfo = {} }) {
  const {
    name = 'ㅇㅇ',
    mbti = 'ENFP',
    gender = 'male',
    r1 = 0,
    r2 = 0,
    r3 = 0,
    r4 = 0,
    r5 = 0,
    totalScore = 0,
    birthMonth = 6,
    loveFortune = [],
    sajuResult = '',
  } = userInfo;

  const [showSaju, setShowSaju] = useState(false);
  const profile = mbtiProfiles[mbti] || {
    title: '-',
    description: `${name} 님의 스타일이에요.`,
    bestMatch: [],
    caution: '올바른 설문 결과를 입력해주세요.'
  };

  const toggleSaju = () => setShowSaju(!showSaju);

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-8 text-white"
      style={{
        backgroundImage: `url(${gender === 'female' ? '/RE_G.png' : '/RE_M.png'})`
      }}
    >
      <div className="max-w-3xl mx-auto bg-black bg-opacity-60 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">🎉 {name} 님의 2025년 연애 성향 진단 결과</h1>

        <p className="text-lg mb-2">💘 연애 MBTI 유형: {mbti} - {profile.title}</p>
        <p className="mb-4">🌸 {profile.description}</p>
        <p className="mb-1">💞 잘 맞는 MBTI 유형: {profile.bestMatch?.length ? profile.bestMatch.join(', ') : '-'}</p>
        <p className="mb-4">⚠️ 주의할 점: {profile.caution}</p>

        <hr className="my-6 border-gray-400" />

        <h2 className="text-xl font-semibold mb-2">📊 점수 기반 해석:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>감정 표현력 (R1): {r1}</li>
          <li>집착 성향 (R2): {r2}</li>
          <li>연애 주도권 (R3): {r3}</li>
          <li>안정/설렘 균형 (R4): {r4}</li>
          <li>설렘 추구 성향 (R5): {r5}</li>
          <li>총점: {totalScore}점</li>
        </ul>

        <hr className="my-6 border-gray-400" />

        <h2 className="text-xl font-semibold mb-2">🌙 월별 연애운</h2>
        <div className="mb-6 space-y-2 text-sm">
          {loveFortune?.map((line, i) => (
            <p key={i}>- {line}</p>
          ))}
        </div>

        <button
          className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full transition"
          onClick={toggleSaju}
        >
          {showSaju ? '사주 접기 🔽' : '🔮 사주 결과 보기'}
        </button>

        {showSaju && (
          <div className="mt-6 bg-gray-100 text-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🔍 사주 분석 결과</h3>
            <p>{sajuResult || '사주 데이터가 없습니다.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}