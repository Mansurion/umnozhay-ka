import { useState, useMemo } from 'react';
import { generateFullTableTasks, generateOptions } from '../../utils/mathHelpers';
import { shuffleArray } from '../../utils/arrayHelpers';
import styles from './mathTrainer.module.css';

export const MathTrainer = () => {
    // 1. Инициализируем полную перемешанную колоду из 100 задач один раз при старте
    const [tasks] = useState(() => shuffleArray(generateFullTableTasks()));
    // 2. Указатель на текущую задачу в массиве
    const [currentIndex, setCurrentIndex] = useState(0);

    // 3. Стейты для текущего раунда
    const [selectedOption, setSelectedOption] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null); // 'correct' | 'wrong' | null
    const [isLocked, setIsLocked] = useState(false);

    const currentTask = tasks[currentIndex];

    // 4. Оптимальное вычисление вариантов ответов без лишних зависимостей и каскадных ререндеров
    const currentOptions = useMemo(() => {
        if (!currentTask) return [];
        const generated = generateOptions(currentTask.correctAnswer);
        return shuffleArray(generated);
    }, [currentTask]);

    // Если дошли до конца массива из 100 задач
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

        // Ждем 1 секунду, показывая подсветку, затем чисто переключаем раунд
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
                    const buttonClass = `${styles.optionButton} ${isSelected && answerStatus === 'correct' ? styles.correct : ''
                        } ${isSelected && answerStatus === 'wrong' ? styles.wrong : ''}`;

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
