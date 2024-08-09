//Components
import { BackButton } from 'react-onsenui';
import Text from '../Text';

//Styles
import styles from './Toolbar.module.css';


/**
 * Interface
 */
interface Props {
    backButton?: boolean;
    title?: string;
    buttons?: ToolbarButton | Array<ToolbarButton>;
}

interface ToolbarButton {
    icon: string;
    text?: string;
    onClick(): () => void;
}


/**
 * Toolbar
 * 
 * @param param0 
 * @returns 
 */
function Toolbar({ backButton, title, buttons }: Props) {
    /**
     * backButtonComponent
     * 
     * Vissza gomb feltételes renderelése
     */
    const backButtonComponent = backButton ? <BackButton /> : null;


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    {backButtonComponent}
                </div>
                <div className={styles.col}>
                    <Text className={styles.title}>
                        {title}
                    </Text>
                </div>
                <div className={styles.col}>

                </div>
            </div>
        </div>
    )
}

export default Toolbar;

