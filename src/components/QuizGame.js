import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RetroCard = ({ children, className = '' }) => (
  <div className={`bg-blue-900 p-4 border-4 ${className}`} style={{
    borderStyle: 'solid',
    borderTopColor: '#7dd3fc',
    borderLeftColor: '#7dd3fc',
    borderRightColor: '#0c4a6e',
    borderBottomColor: '#0c4a6e',
  }}>
    {children}
  </div>
);

const RetroButton = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full px-4 py-2 bg-blue-700 text-white border-4 transition-all 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 active:translate-y-1'} ${className}`}
    style={{
      borderStyle: 'solid',
      borderTopColor: '#7dd3fc',
      borderLeftColor: '#7dd3fc',
      borderRightColor: '#0c4a6e',
      borderBottomColor: '#0c4a6e',
      imageRendering: 'pixelated',
    }}
  >
    {children}
  </button>
);

const QuizGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // ... (questions array stays the same)
  const questions = [
    {
      question: 'JavaScriptの配列メソッドで、要素を追加するメソッドは？',
      options: ['push()', 'add()', 'insert()', 'append()'],
      correctAnswer: 0
    },
    {
      question: 'HTMLの略称として正しいものは？',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Hyper Transfer Markup Language',
        'Hybrid Text Making Language'
      ],
      correctAnswer: 0
    },
    {
      question: 'CSSのposition:relativeの特徴として正しいものは？',
      options: [
        '要素を固定位置に配置する',
        '通常の位置を基準に相対配置する',
        '親要素を基準に絶対配置する',
        'ドキュメントを基準に絶対配置する'
      ],
      correctAnswer: 1
    }
  ];

  // ... (handler functions stay the same)
  const handleStartGame = () => {
    if (playerName.trim()) {
      setGameStarted(true);
      setGameFinished(false);
      setScore(0);
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setPlayerName('');
    setIsCorrect(null);
  };

  // 名前入力画面
  if (!gameStarted && !gameFinished) {
    return (
      <div className="w-full max-w-md mx-auto px-4">
        <RetroCard>
          <h1 className="text-2xl font-bold text-center text-white mb-8 pixel-font">
            16ビットクイズ
          </h1>
          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2 pixel-font">なまえをにゅうりょく</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 bg-blue-950 text-white border-4"
                style={{
                  borderStyle: 'solid',
                  borderTopColor: '#0c4a6e',
                  borderLeftColor: '#0c4a6e',
                  borderRightColor: '#7dd3fc',
                  borderBottomColor: '#7dd3fc',
                }}
              />
            </div>
            <RetroButton
              onClick={handleStartGame}
              disabled={!playerName.trim()}
            >
              はじめる
            </RetroButton>
          </div>
        </RetroCard>
      </div>
    );
  }

  // 結果画面
  if (gameFinished) {
    const percentage = (score / questions.length) * 100;
    let message = '';
    if (percentage === 100) {
      message = 'パーフェクト！';
    } else if (percentage >= 80) {
      message = 'すばらしい！';
    } else if (percentage >= 60) {
      message = 'よくできました！';
    } else {
      message = 'つぎはがんばろう！';
    }

    return (
      <div className="w-full max-w-md mx-auto px-4">
        <RetroCard>
          <h2 className="text-2xl font-bold text-center text-white mb-6 pixel-font">けっか</h2>
          <div className="text-center space-y-4">
            <div className="text-white pixel-font">
              <p className="text-xl">{playerName}の スコア</p>
              <p className="text-4xl font-bold mt-2">{score}/{questions.length}</p>
              <p className="text-xl mt-4">せいかいりつ {percentage}%</p>
              <p className="text-xl mt-4 text-yellow-300">{message}</p>
            </div>
          </div>
          <div className="mt-8">
            <RetroButton onClick={handleRestartGame}>
              もういちど プレイする
            </RetroButton>
          </div>
        </RetroCard>
      </div>
    );
  }

  // クイズ画面
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <RetroCard>
        <div className="flex justify-between text-white mb-4 pixel-font">
          <span>プレイヤー: {playerName}</span>
          <span>スコア: {score}/{questions.length}</span>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg text-white mb-2 pixel-font">
              もんだい {currentQuestionIndex + 1}/{questions.length}
            </h3>
            <p className="text-white mb-4 pixel-font">{currentQuestion.question}</p>
          </div>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <RetroButton
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={
                  showResult
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-600'
                      : index === selectedAnswer
                      ? 'bg-red-600'
                      : ''
                    : ''
                }
              >
                {option}
              </RetroButton>
            ))}
          </div>

          {showResult && (
            <div className="flex justify-center items-center mt-4">
              <div className={`pixel-font text-6xl font-bold ${isCorrect ? 'text-blue-300' : 'text-red-500'}`}>
                {isCorrect ? '〇' : '×'}
              </div>
            </div>
          )}
        </div>
      </RetroCard>
    </div>
  );
};

// 全体のスタイルを適用するためのラッパーコンポーネント
const GameWrapper = () => (
  <div className="min-h-screen bg-blue-950 py-8" style={{
    backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)',
    backgroundSize: '16px 16px',
  }}>
    <style jsx global>{`
      @font-face {
        font-family: 'PixelFont';
        src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      }
      .pixel-font {
        font-family: 'PixelFont', monospace;
        letter-spacing: 0.1em;
        line-height: 1.5;
      }
    `}</style>
    <QuizGame />
  </div>
);

export default GameWrapper;
