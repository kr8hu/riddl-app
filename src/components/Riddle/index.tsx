//Components
import Text from '../Text';

//Styles
import styles from './Riddle.module.css';


/**
 * Interfaces
*/
interface Props {
    image: string;
    description?: string;
}


/**
 * Riddle
 * 
 * Egy rejtvényt megjelenítő komponens
 * @returns 
 */
function Riddle({ image, description }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.wrapper}>
                        <img
                            alt='riddle'
                            className={styles.image}
                            src={image} />
                    </div>
                </div>
                <div className={styles.col}>
                    <Text
                        className={styles.descriptionTitle}
                        node="riddle_description" />
                    <Text
                        className={styles.descriptionContent}
                        node={description ? null : "riddle_no_description"}>
                        {description}
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default Riddle;
