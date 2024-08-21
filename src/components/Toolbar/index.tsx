//Onsen UI
import { BackButton } from 'react-onsenui';

//Components
import Text from '../Text';

//Styles
import styles from './Toolbar.module.css';


/**
 * Interface
 */
interface Props {
    backButton?: boolean;
    title?: string;
    buttons?: IToolbarButton | Array<IToolbarButton>;
}

interface IToolbarButton {
    icon: string;
    text?: string;
    onClick(): () => void;
}


/**
 * Toolbar
 * 
 * @returns 
 */
function Toolbar({ backButton, title, buttons }: Props) {
    /**
     * Variables
     */
    
    //Vissza gomb feltételes renderelése
    const renderBackButton = backButton ? <BackButton /> : null;


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Vissza gomb */}
                <div className={styles.col}>
                    {renderBackButton}
                </div>

                {/* Címsor */}
                <div className={styles.col}>
                    <Text className={styles.title}>
                        {title}
                    </Text>
                </div>

                {/* További gombok */}
                <div className={styles.col}>
                    {/* TODO */}
                </div>
            </div>
        </div>
    )
}

export default Toolbar;

