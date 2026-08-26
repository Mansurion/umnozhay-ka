import { ANSWER_STATUS } from '../../constants/constants';
import { clsx } from 'clsx';
import { useState, useMemo } from 'react';
import { generateFullTableTasks, generateOptions } from '../../utils/mathHelpers';
import { shuffleArray } from '../../utils/arrayHelpers';
import styles from './mathTrainer.module.css';

export const MathTrainer = () => {
    const [tasks, setTasks] = useState(() => shuffleArray(generateFullTableTasks()));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [isLocked, setIsLocked] = useState(false);

    const currentTask = tasks[currentIndex];

    const currentOptions = useMemo(() => {
        if (!currentTask) return [];
        const generated = generateOptions(currentTask.correctAnswer);
        return shuffleArray(generated);
    }, [currentTask]);

    const handleReset = function () {
        setTasks(shuffleArray(generateFullTableTasks()));
        setCurrentIndex(0);
        setCorrectCount(0);
        setSelectedOption(null);
        setAnswerStatus(null);
        setIsLocked(false);
    };

    if (currentIndex >= tasks.length) {
        return (
            <div className={styles.trainerCard}>
                <h2 className={styles.expression}>Ура! 🎉</h2>
                <p className={styles.progressText}>Ты прошёл все 100 задач таблицы умножения!</p>
                <button
                    className={styles.optionButton}
                    onClick={function () {
                        handleReset();
                    }}
                >
                    Начать заново
                </button>
            </div>
        );
    }

    const handleAnswer = (option, event) => {
        if (isLocked) return;
        event.currentTarget.blur();
        setSelectedOption(option);
        setIsLocked(true);

        const isCorrect = option === currentTask.correctAnswer;
        setAnswerStatus(isCorrect ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.WRONG);

        setTimeout(() => {
            if (isCorrect) {
                setCorrectCount((prev) => prev + 1);
            } else {
                const repeatedTask = {
                    ...currentTask,
                    id: `${currentTask.id}-repeat-${Date.now()}`,
                };
                setTasks((prevTasks) => [...prevTasks, repeatedTask]);
            }

            setAnswerStatus(null);
            setSelectedOption(null);
            setCurrentIndex((prev) => prev + 1);
            setIsLocked(false);
        }, 1000);
    };

    return (
        <div className={styles.trainerCard}>
            <div className={styles.progressText}>
                Правильно решено: {correctCount} из 100
            </div>

            <div className={styles.expression}>
                {currentTask.num1} × {currentTask.num2}
            </div>

            <div className={styles.optionsGrid}>
                {currentOptions.map(function (option, index) {
                    const isSelected = option === selectedOption;

                    const getButtonClass = function () {
                        if (isSelected && answerStatus === ANSWER_STATUS.CORRECT) return styles.correct;
                        if (isSelected && answerStatus === ANSWER_STATUS.WRONG) return styles.wrong;
                        return '';
                    };

                    return (
                        <button
                            key={index}
                            className={clsx(styles.optionButton, getButtonClass())}
                            onClick={function (e) {
                                handleAnswer(option, e);
                            }}
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
