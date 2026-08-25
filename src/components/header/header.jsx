import { PROJECT_NAME } from '../../constants/constants';
import styles from './header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>{PROJECT_NAME}</div>
            </div>
        </header>
    );
};
