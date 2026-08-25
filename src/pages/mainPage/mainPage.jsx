import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import styles from './mainPage.module.css';

export const MainPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Прокачай умножение</h1>
            <p className={styles.subtitle}>
                Минималистичный тренажер таблицы умножения от 1 до 10. Проверь свою скорость и точность счета!
            </p>
            <Link to={ROUTES.TRAINER} className={styles.startButton}>
                Начать тренировку
            </Link>
        </div>
    );
};
