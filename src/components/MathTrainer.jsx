import React, { useState, useEffect } from 'react';

const MathTrainer = () => {
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [num1, setNum1] = useState(2);
    const [num2, setNum2] = useState(2);
    const [options, setOptions] = useState([]);

    const generateRound = () => {
        const n1 = Math.floor(Math.random() * 8) + 2;
        const n2 = Math.floor(Math.random() * 8) + 2;
        const correctAnswer = n1 * n2;

        setNum1(n1);
        setNum2(n2);

        const optionsSet = new Set();
        optionsSet.add(correctAnswer);

        while (optionsSet.size < 4) {
            const wrong = (Math.floor(Math.random() * 8) + 2) * (Math.floor(Math.random() * 8) + 2);
            if (wrong !== correctAnswer) {
                optionsSet.add(wrong);
            }
        }

        setOptions(Array.from(optionsSet).sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        generateRound();
    }, []);

    const handleAnswer = (selectedOption) => {
        const correctAnswer = num1 * num2;
        if (selectedOption === correctAnswer) {
            setScore(prev => prev + 10);
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }
        generateRound();
    };

    return (
        <div className="container" id="main-card">
            <div className="left-col">
                <div className="header-meta">
                    <div className="meta-box" id="score-text">Очки: {score}</div>
                    <div className="meta-box btn-inventory">Рюкзак 🎒</div>
                </div>
                <div className="expression" id="math-display">{num1} × {num2}</div>
            </div>

            <div className="right-col">
                <div className="header-meta">
                    <div className="meta-box" id="streak-text">Серия: {streak} [X3 COMBO]</div>
                    <div className="meta-box" id="rank-badge">БРОНЗА / НОВИЧОК 🥉</div>
                </div>
                <div className="options-grid" id="choices-block">
                    {options.map((val, index) => (
                        <button key={index} className="btn-option" onClick={() => handleAnswer(val)}>
                            {val}
                        </button>
                    ))}
                </div>
                <div className="joke-panel" id="joke-text">Покажи, на что способны твои извилины, Муса!</div>
                <div style={{ height: '10px' }}></div>
                <button className="next-btn" id="btn-next" onClick={generateRound}>Следующий пример</button>
            </div>
        </div>
    );

};

export default MathTrainer;
