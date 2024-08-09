//Onsen UI
import { Icon } from 'react-onsenui';

//Components
import Text from '../Text';

//Styles
import styles from './Tiles.module.css';


/**
 * Interfaces
 */
interface Props {
    title: string;
    description?: string;
    icon: string;
    onClick?(): () => void;
}


/**
 * Tile
 * 
 * Csempe stílusú komponens
 * 
 * @param title 
 * @param description 
 * @param icon 
 * @returns 
 */
function Tile({ title, description, icon, onClick }: Props) {
    /**
     * onClickHandler
     * 
     * Kattintást kezelő funkció
     */
    const onClickHandler = () => onClick ? onClick() : null;


    /**
     * renderDescription
     * 
     * Feltételes renderelés
     * 
     * @returns 
     */
    const renderDescription = () => {
        if (!description) return null;

        return (
            <Text className={styles.description}>
                {description}
            </Text>
        )
    }


    return (
        <div className={styles.container} onClick={onClickHandler}>
            {/* Címsor */}
            <Text className={styles.title}>
                {title}
            </Text>

            {/* Alcím */}
            {renderDescription()}

            {/* Ikon */}
            <Icon
                className={styles.icon}
                icon={icon}
                fixedWidth />
        </div>
    )
}

export default Tile;
