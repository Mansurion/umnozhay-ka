import { useState } from 'react';
import './MathTrainer.css';

const createRoundData = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    const correctAnswer = n1 * n2;

    const optionsSet = new Set();
    optionsSet.add(correctAnswer);

    while (optionsSet.size < 4) {
        const wrong = (Math.floor(Math.random() * 8) + 2) * (Math.floor(Math.random() * 8) + 2);
        if (wrong !== correctAnswer) {
            optionsSet.add(wrong);
        }
    }

    const shuffledOptions = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return { n1, n2, shuffledOptions };
};

const MathTrainer = () => {
    const [answerStatus, setAnswerStatus] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [initialRound] = useState(() => createRoundData());
    const [num1, setNum1] = useState(initialRound.n1);
    const [num2, setNum2] = useState(initialRound.n2);
    const [options, setOptions] = useState(initialRound.shuffledOptions);

    const generateRound = () => {
        const { n1, n2, shuffledOptions } = createRoundData();
        setNum1(n1);
        setNum2(n2);
        setOptions(shuffledOptions);
    };

    const handleAnswer = (option) => {
        const correctAnswer = num1 * num2;
        setSelectedOption(option);

        if (option === correctAnswer) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('wrong');
        }

        setTimeout(() => {
            generateRound();
            setAnswerStatus(null);
            setSelectedOption(null);
        }, 1000);
    };

    return (
        <div className="container" id="main-card">
            <div className="expression" id="math-display">{num1} × {num2}</div>
            <div className="options-grid" id="choices-block">
                {options.map((val, index) => (
                    <button key={index} className={`btn-option ${val === selectedOption ? answerStatus : ''}`.trim()} onClick={() => handleAnswer(val)} disabled={answerStatus !== null}>
                        {val}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MathTrainer;