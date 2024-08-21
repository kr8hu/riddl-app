//Onsen UI
import { Page } from 'react-onsenui';

//Views
import Summary from '../Summary';

//Components
import Gameboard from './Gameboard';

//Interfaces
import IRiddle from '../../interfaces/Riddle';

//Styles
import styles from './Playroom.module.css';


/**
 * Interfaces
*/
interface Props {
    navigator: any;
    categoryId: string;
    riddles: Array<IRiddle>;
}


/**
 * Playroom
 * 
 * @param navigator 
 * @param categoryId 
 * @param riddles 
 * @returns 
 */
function Playroom({ navigator, categoryId, riddles }: Props) {
    /**
     * handleExit
     * 
     * Kilépéskor lefutó funkció
     *
     * @param solved 
     */
    const handleExit = (solved: Array<any>) => {
        console.log(solved);

        navigator.replacePage({
            component: Summary,
            props: {
                categoryId,
                riddles,
                solved
            }
        });
    };


    return (
        <Page>
            <div className={styles.container}>
                <Gameboard
                    riddles={riddles}
                    onExit={handleExit} />
            </div>
        </Page>
    )
}

export default Playroom;
