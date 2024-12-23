'use client';
import React, { useState } from 'react';

const QuizGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

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
    }
  ];

  const handleStartGame = () => {
    if (playerName.trim()) {
      setGameStarted(true);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const isCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameFinished(true);
    }
  };

  if (!gameStarted) {
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">クイズゲーム</h1>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="なまえを入力"
          className="border p-2 mb-4 block"
        />
        <button 
          onClick={handleStartGame}
          className="bg-blue-500 text-white p-2 rounded"
        >
          はじめる
        </button>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4">けっか</h2>
        <p>{playerName}さんのスコア: {score}/{questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="p-4">
      <div className="mb-4">
        <span>プレイヤー: {playerName}</span>
        <span className="ml-4">スコア: {score}/{questions.length}</span>
      </div>
      <h3 className="text-xl mb-4">もんだい {currentQuestionIndex + 1}</h3>
      <p className="mb-4">{currentQuestion.question}</p>
      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className="block w-full p-2 mb-2 bg-blue-100 hover:bg-blue-200 rounded"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizGame;
