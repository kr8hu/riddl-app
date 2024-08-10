//Onsen UI
import { Page } from 'react-onsenui';

//Views
import Home from '../Home';
import Summary from '../Summary';

//Components
import Gameboard from '../../components/Gameboard';

//Interfaces
import IRiddle from '../../interfaces/Riddle';

//Styles
import styles from './Playroom.module.css';


/**
 * Interfaces
*/
interface Props {
    navigator: any;
    riddles: Array<IRiddle>;
}


/**
 * 
 * @param riddles 
 * @returns 
 */
function Playroom({ navigator, riddles }: Props) {
    /**
     * handlePlayerLeave
     * 
     * Játék elhagyását kezelő funkció
     * 
     */
    const handleOnLeave = () => {
        navigator.resetPage({ component: Home });
    }


    /**
     * handleOnSolved
     * 
     * Kategória teljesítésekor lefutó funkció
     * 
     */
    const handleOnFinish = (solved: Array<any>) => {
        navigator.replacePage({
            component: Summary,
            props: {
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
                    onFinished={handleOnFinish}
                    onLeave={handleOnLeave} />
            </div>
        </Page>
    )
}

export default Playroom;
