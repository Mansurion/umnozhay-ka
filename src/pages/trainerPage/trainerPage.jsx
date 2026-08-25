import { MathTrainer } from '../../components/mathTrainer/mathTrainer';
import styles from './trainerPage.module.css';

export const TrainerPage = () => {
    return (
        <div className={styles.wrapper}>
            <MathTrainer />
        </div>
    );
};
