//Onsen UI
import { Page } from 'react-onsenui';

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
    dataset: Array<IRiddle>;
}


/**
 * 
 * @param dataset 
 * @returns 
 */
function Playroom({ navigator, dataset }: Props) {
    const dummyData = [
        {
            image: "https://zeevector.com/wp-content/uploads/Playstation-Logo-vector-PNG.png",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            solution: "playstation",
            completed: false,
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            solution: "xbox",
            completed: false,
        },
        {
            image: "https://static.wikia.nocookie.net/logopedia/images/b/b3/God_of_War_2016_%28Icon%29.svg/revision/latest?cb=20221110002755",
            description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            solution: "god of war",
            completed: false,
        },
        {
            image: "https://zeevector.com/wp-content/uploads/Playstation-Logo-vector-PNG.png",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            solution: "playstation",
            completed: false,
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            solution: "xbox",
            completed: false,
        },
    ];


    /**
     * handlePlayerLeave
     * 
     * Játék elhagyását kezelő funkció
     * 
     */
    const handlePlayerLeave = () => {
        navigator.popPage();
    }


    return (
        <Page>
            <div className={styles.container}>
                <Gameboard 
                    riddles={dummyData}
                    onPlayerLeave={handlePlayerLeave} />
            </div>
        </Page>
    )
}

export default Playroom;
