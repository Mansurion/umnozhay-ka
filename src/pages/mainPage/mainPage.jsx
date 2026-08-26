import { MathTrainer } from '../../components/mathTrainer/mathTrainer';
import styles from './mainPage.module.css';

export const MainPage = () => {
    return (
        <div className={styles.container}>
            <MathTrainer />
        </div>
    );
};
