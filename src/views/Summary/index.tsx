//React
import {
    useState,
    useEffect,
    useContext
} from 'react';

//Components
import { AppContext } from '../../context/App';

//Onsen UI
import ons from 'onsenui';
import { Page } from 'react-onsenui';

//Components
import Toolbar from '../../components/Toolbar';
import Text from '../../components/Text';
import Table from '../../components/Table';

//Interfaces
import IRiddle from '../../interfaces/Riddle';
import ITableItem from '../../interfaces/TableItem';

//Services
import UserService from '../../services/UserService';
import RiddleService from '../../services/RiddleService';

//Shared
import { actionTypes } from '../../shared/const';

//Styles
import styles from './Summary.module.css';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
    categoryId: string;
    riddles: Array<IRiddle>;
    solved: Array<any>;
}


/**
 * Summary
 * 
 * @param param0 
 */
function Summary({ navigator, categoryId, riddles, solved }: Props) {
    /**
     * Context
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * States
     */
    //Kategóriához tartozó rejtvények
    const [categoryRiddles, setCategoryRiddles] = useState<IRiddle[]>([]);

    //Összes megoldott rejtvény
    const [totalSolvedRiddles, setTotalSolvedRiddles] = useState<IRiddle[]>([]);


    /**
     * Variables
     */
    //Teljesített rejtvények aránya százalékban meghatározva
    const ratio: number = totalSolvedRiddles.length * 100 / categoryRiddles.length;


    //Kategória adatok
    const categoryStats: Array<ITableItem> = [
        {
            name: "Összes rejtvény",
            value: categoryRiddles.length
        },
        {
            name: "Összes megoldott rejtvény",
            value: totalSolvedRiddles.length
        },
        {
            name: "Teljesítettek aránya",
            value: `${ratio.toFixed(0)}%`
        }
    ];

    //Jelenlegi játékeredmények adatai
    const gameStats: Array<ITableItem> = [
        {
            name: "Összes rejtvény",
            value: riddles.length
        },
        {
            name: "Összes megoldott rejtvény",
            value: solved.length
        },
    ];


    /**
     * getCategoryRiddles
     * 
     * Kategóriába tartozó rejtvények lekérése és tárolása
     */
    const getCategoryRiddles = async () => {
        //Kategória lekérése
        const response = await RiddleService.findByQuery({ category: categoryId });
        const data = response.payload;

        //Hibakezelés
        if (!data) return;

        //Tárolás a stateben
        setCategoryRiddles(data);
    }


    /**
     * completeCategory
     * 
     * Felhasználó adatianak frissítése a kategória elvégzésével
     */
    const completeCategory = async () => {
        try {
            //Adatok
            const data = { completed: [...appState.userdata.completed, categoryId] };

            //Frissítés
            const response = await UserService.update(appState.userdata._id, data);
            const updatedUserdata = response.payload;

            //Hibakezelés
            if (!updatedUserdata) {
                ons.notification.toast("Hiba történt a felhasználói adatok frissítése közben.");
            }

            //Tárolás a global stateben
            setAppState(actionTypes.app.SET_USERDATA, updatedUserdata);
        }
        //Hibakezelés
        catch (error) {
            ons.notification.toast("Hiba történt.");
        }
    }


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        getCategoryRiddles();
        //eslint-disable-next-line
    }, []);


    /**
     * useEffect
     * 
    */
    useEffect(() => {
        if (categoryRiddles.length !== 0) {
            //A felhasználó már megoldott rejtvényei
            const userSolvedRiddles: Array<string> = appState.userdata.solved;

            //Azoknak a rejtvényeknek a szűrése, amelyek a jelenleg kiválasztott kategórából már megfejtésre kerültek
            let data: Array<IRiddle> = [];
            data = categoryRiddles.filter((riddle: IRiddle, idx: number) => riddle._id === userSolvedRiddles[idx]);

            //Tárolás a stateben
            setTotalSolvedRiddles(data);
        }
        //eslint-disable-next-line
    }, [categoryRiddles]);


    /**
     * useEffect
     * 
     * Ha 100%-ot teljesített a felhasználó, a kategória elvégezve
     */
    useEffect(() => {
        if (ratio === 100) {
            completeCategory();
        }
        //eslint-disable-next-line
    }, [ratio]);


    return (
        <Page>
            <div className={styles.container}>
                {/* Fejléc */}
                <Toolbar
                    backButton
                    title="Összegzés" />

                {/* Tartalom */}
                <div className={styles.wrapper}>
                    {/* Kategória statjai */}
                    <Text
                        className={styles.title}
                        node="summary_category_stats" />
                    <Table data={categoryStats} />

                    {/* Jelenlegi próbálkozás/játék statjai */}
                    <Text
                        className={styles.title}
                        node="summary_game_stats" />
                    <Table data={gameStats} />
                </div>
            </div>
        </Page>
    )
}

export default Summary;
