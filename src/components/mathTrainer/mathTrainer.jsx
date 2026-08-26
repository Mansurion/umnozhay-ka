import { clsx } from 'clsx';
import { useState, useMemo } from 'react';
import { generateFullTableTasks, generateOptions } from '../../utils/mathHelpers';
import { shuffleArray } from '../../utils/arrayHelpers';
import styles from './mathTrainer.module.css';

export const MathTrainer = () => {
    const [tasks] = useState(() => shuffleArray(generateFullTableTasks()));
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedOption, setSelectedOption] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null); // 'correct' | 'wrong' | null
    const [isLocked, setIsLocked] = useState(false);

    const currentTask = tasks[currentIndex];

    const currentOptions = useMemo(() => {
        if (!currentTask) return [];
        const generated = generateOptions(currentTask.correctAnswer);
        return shuffleArray(generated);
    }, [currentTask]);

    if (currentIndex >= tasks.length) {
        return (
            <div className={styles.trainerCard}>
                <h2 className={styles.expression}>Ура! 🎉</h2>
                <p className={styles.progressText}>Ты прошёл все 100 задач таблицы умножения!</p>
            </div>
        );
    }

    const handleAnswer = (option, event) => {
        if (isLocked) return;

        event.currentTarget.blur();
        setSelectedOption(option);
        setIsLocked(true);

        const isCorrect = option === currentTask.correctAnswer;
        setAnswerStatus(isCorrect ? 'correct' : 'wrong');

        setTimeout(() => {
            setAnswerStatus(null);
            setSelectedOption(null);
            setCurrentIndex((prev) => prev + 1);
            setIsLocked(false);
        }, 1000);
    };

    return (
        <div className={styles.trainerCard}>
            <div className={styles.progressText}>
                Задача {currentIndex + 1} из {tasks.length}
            </div>

            <div className={styles.expression}>
                {currentTask.num1} × {currentTask.num2}
            </div>

            <div className={styles.optionsGrid}>
                {currentOptions.map((option, index) => {
                    const isSelected = option === selectedOption;
                    const isCorrectAnswer = isSelected && answerStatus === 'correct';
                    const isWrongAnswer = isSelected && answerStatus === 'wrong';

                    const buttonClass = clsx(
                        styles.optionButton,
                        isCorrectAnswer && styles.correct,
                        isWrongAnswer && styles.wrong
                    );

                    return (
                        <button
                            key={index}
                            className={buttonClass}
                            onClick={(e) => handleAnswer(option, e)}
                            disabled={isLocked}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
