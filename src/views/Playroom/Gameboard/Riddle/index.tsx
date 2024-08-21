//Components
import Text from '../../../../components/Text';

//Shared
import { url } from '../../../../shared/const';

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
 * @returns 
 */
function Riddle({ image, description }: Props) {
    /**
     * Variables
     */
    //Kép elérési útvonala
    const imageUrl = `${url}/public/images/${image}`;


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Rejtvény képe */}
                <div className={styles.col}>
                    <div className={styles.wrapper}>
                        <img
                            alt='riddle'
                            className={styles.image}
                            src={imageUrl} />
                    </div>
                </div>
                {/* Rejtvény leírása */}
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
