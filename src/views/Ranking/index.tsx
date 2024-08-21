//React
import {
    useEffect,
    useState
} from 'react';

//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Toolbar from '../../components/Toolbar';

//Services
import UserService from '../../services/UserService';

//Interfaces
import IUserdata from '../../interfaces/Userdata';
import IServiceResponse from '../../interfaces/ServiceResponse';

//Styles
import styles from './Ranking.module.css';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
}

interface ITableHeadColumns {
    key: string;
    value: string;
}


/**
 * Ranking
 * 
 */
function Ranking({ navigator }: Props) {
    /**
     * States
     */
    const [players, setPlayers] = useState<Array<IUserdata>>([]);


    /**
     * Variables
     */
    const tableHeadColumns = [
        {
            key: "#",
            value: "#"
        },
        {
            key: "username",
            value: "Felhasználónév"
        },
        {
            key: "completed",
            value: "Teljesített kategóriák"
        },
        {
            key: "solved",
            value: "Megoldott rejtvények"
        },
        {
            key: "points",
            value: "Pontszám"
        },
    ];


    /**
     * getPlayers
     * 
     * Játékosok adatainak lekérése és tárolása stateben
     */
    const getPlayers = async () => {
        try {
            //Összes user/játékos lekérdezése
            const response: IServiceResponse = await UserService.findAll();

            //Ha nincs játékos
            if (!response.payload) return;

            //Tárolás a stateben
            setPlayers(response.payload);
        }
        //Hibakezelés
        catch (error) {
            alert("Hiba a ranglista betöltése közben.");
            navigator.popPage();
        }
    }


    /**
     * renderTableHead
     * 
     * @returns 
     */
    const renderTableHead = () => {
        return tableHeadColumns.map((col: ITableHeadColumns) => {
            return (
                <div
                    key={col.key}
                    className={styles.col}>
                    {col.value}
                </div>
            )
        })
    }


    /**
     * renderTableBody
     * 
     * @returns 
     */
    const renderTableBody = () => {
        return players.map((player: IUserdata, idx: number) => {
            return (
                <div key={idx} className={styles.row}>
                    {tableHeadColumns.map((col: ITableHeadColumns, idx: number) => {
                        //Helyezés
                        const rank = `${idx+1}.`;

                        //Játékos adat
                        const playerData = player[col.key as keyof IUserdata];

                        //Adat vizsgálata
                        const isPlayerDataArray = Array.isArray(playerData);

                        //Ha az adat tömb, csak a hosszát íratjuk ki
                        const clarifiedData = isPlayerDataArray ? (playerData as Array<any>).length : playerData

                        return (
                            <div key={col.key} className={styles.col}>
                                {col.key === '#' ? rank : clarifiedData}
                            </div>
                        )
                    })}
                </div>
            )
        })
    }


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        getPlayers();
        //eslint-disable-next-line
    }, []);


    return (
        <Page>
            <div className={styles.container}>
                {/* Fejléc */}
                <Toolbar
                    backButton
                    title="Ranglista" />

                {/* Táblázat */}
                <div className={styles.table}>
                    <div className={styles.head}>
                        {renderTableHead()}
                    </div>
                    <div className={styles.body}>
                        {renderTableBody()}
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Ranking;
