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
    className?: any;
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
 * @returns 
 */
function Tile(props: Props) {
    /**
     * Variables
     */
    const classNames: string = `${styles.container} ${props.className}`;


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => props.onClick ? props.onClick() : null;


    /**
     * renderDescription
     * 
     * Vissza gomb feltételes renderelése
     * 
     * @returns 
     */
    const renderDescription = () => {
        if (!props.description) return null;

        return (
            <Text className={styles.description}>
                {props.description}
            </Text>
        )
    }


    return (
        <div className={classNames} onClick={onClickHandler}>
            {/* Címsor */}
            <Text className={styles.title}>
                {props.title}
            </Text>

            {/* Leírás */}
            {renderDescription()}

            {/* Ikon */}
            <Icon
                className={styles.icon}
                icon={props.icon}
                fixedWidth />
        </div>
    )
}

export default Tile;
