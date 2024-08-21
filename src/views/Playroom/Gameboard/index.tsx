//React
import {
    useCallback,
    useEffect,
    useState,
    useRef,
    useContext
} from 'react';

//Context
import { AppContext } from '../../../context/App';

//Onsen UI
import { ProgressBar } from 'react-onsenui';

//Components
import Text from '../../../components/Text';
import Riddle from './Riddle';

//Interfaces
import IRiddle from '../../../interfaces/Riddle';

//Shared
import { actionTypes } from '../../../shared/const';

//Services
import UserService from '../../../services/UserService';
import RiddleService from '../../../services/RiddleService';

//Styles
import styles from './Gameboard.module.css';


/**
 * Variables
 */
let interval: NodeJS.Timeout;

const progressTotal: number = 100;
const decrementValue: number = 1;
const intervalTime: number = 200;
const pendingTime: number = 2500;


/**
 * Interfaces
*/
interface Props {
    riddles: Array<IRiddle>;
    onExit: (solved: Array<any>) => void;
}


/**
 * Gameboard
 * 
 * @param riddles 
 * @returns 
 */
function Gameboard({ riddles, onExit }: Props) {
    /**
     * Context
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * States
     */
    const [index, setIndex] = useState<number>(0);
    const [progress, setProgress] = useState<number>(progressTotal);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [solved, setSolved] = useState<Array<IRiddle>>([]);


    /**
     * Refs
     */
    const inputRef = useRef<HTMLInputElement>(null);


    /**
     * Variables
     */
    const image = `${riddles[index]?._id}.png`


    /**
     * initializeRiddle
     * 
     * Rejtvény alap állapotba helyezése
     * 
     */
    const initializeRiddle = () => {
        setTimeout(() => {
            setIsRunning(true);

            if (inputRef && inputRef.current) {
                inputRef.current.value = "";
            }
        }, pendingTime);
    }


    /**
     * startRiddle
     * 
     * Rejtvény indítása
     * 
     */
    const startRiddle = () => {
        inputRef.current?.focus();

        interval = setInterval(() => {
            setProgress((current: number) => current - decrementValue);
        }, intervalTime);
    }


    /**
     * finalizeRiddle
     * 
     * Rejtvény befejezése
     * 
     */
    const finalizeRiddle = useCallback(() => {
        clearInterval(interval);

        setIsRunning(false);
        setProgress(progressTotal);
        setIndex((current: number) => current + 1);
    }, []);


    /**
     * handleEnterKeydown
     * 
     * Enter gomblenyomást kezelő funkció
     * 
     * @param e 
     */
    const handleEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isRunning) {
            checkUserGuess();
        }
    }


    /**
     * checkUserGuess
     * 
     * A felhasználó által megadott tipp ellenörzése
     * 
     */
    const checkUserGuess = async () => {
        try {
            //Ellenörzéshez szükséges adatok
            const data = {
                id: riddles[index]._id,
                guess: inputRef?.current?.value
            }

            //Tipp ellenörzése szerver oldalon
            const response = await RiddleService.validation(data);

            //Eredmény
            if (!response.payload) {
                alert("A válasz helytelen");
            } else {
                //A megoldott rejtvény hozzáadása a user adatait tartalmazó adatbázisban
                updateUserSolvedRiddles(riddles[index]._id);

                //Visszajelzés a felhasználónak
                alert("A válasz helyes.");

                //Megoldott rejtvény felvétele a statebe
                setSolved((current: Array<IRiddle>) => [
                    ...current,
                    riddles[index]._id
                ]);

                //Jelenlegi rejtvény lezárása
                finalizeRiddle();
            }
        }
        //Hibakezelés
        catch (error) {
            alert("Hiba történt.");
            onExit(solved);
        }
    }


    /**
     * updateUserSolvedRiddles
     * 
     */
    const updateUserSolvedRiddles = async (riddleId: string) => {
        try {
            const userSolvedRiddles = appState.userdata.solved;

            const data = { solved: [...userSolvedRiddles, riddleId] };
            const response = await UserService.update(appState.userdata._id, data);

            if (!response.payload) {
                alert("Hiba történt.");
                onExit(solved);
            }

            setAppState(actionTypes.app.SET_USERDATA, response.payload);
        }
        catch (error) {
            alert("Hiba történt.");
            onExit(solved);
        }
    }


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        /**
        * handleEscapeKeydown
        * 
        * Escape gomb lenyomását kezelő funkció
        * 
        * @param e 
        */
        const handleEscapeKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                const confirmed = window.confirm("Biztosan kilépsz?");
                if (confirmed) onExit(solved);
            }
        }

        window.addEventListener('keydown', handleEscapeKeydown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeydown);
        }
        //eslint-disable-next-line
    }, [solved]);


    /**
     * useEffect
     * 
     * Idő lejárása
    */
    useEffect(() => {
        if (progress === 0) {
            setTimeout(() => finalizeRiddle(), 500);
        }
    }, [progress, finalizeRiddle]);


    /**
     * useEffect
     * 
     * Kör kezelése
     */
    useEffect(() => {
        if (isRunning) {
            startRiddle();
        } else {
            initializeRiddle();
        }
    }, [isRunning]);


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        if (index === riddles.length) {
            onExit(solved);
        }
        //eslint-disable-next-line
    }, [index, riddles.length]);


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Bal oldali szekció */}
                <div className={styles.col}>
                    <Riddle
                        image={image}
                        description={riddles[index]?.description} />
                </div>

                {/* Jobb oldali szekció */}
                <div className={styles.col}>
                    {/* Cím */}
                    <Text
                        className={styles.inputTitle}
                        node="gameboard_input_title" />

                    {/* Input */}
                    <input
                        type="text"
                        maxLength={32}
                        disabled={!isRunning}
                        className={styles.inputField}
                        onKeyDown={handleEnterKeydown}
                        ref={inputRef} />

                    {/* Küldés gomb */}
                    <button
                        className={styles.button}
                        onClick={checkUserGuess}
                        disabled={!isRunning}>
                        Tippelek
                    </button>

                    {/* Szöveg */}
                    <Text
                        className={styles.inputDescription}
                        node="gameboard_input_description" />
                </div>
            </div>

            {/* Hátralévő idő */}
            <div className={styles.timer}>
                <ProgressBar
                    value={progress}
                    secondaryValue={progressTotal} />
            </div>
        </div>
    )
}

export default Gameboard;
