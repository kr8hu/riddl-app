//React
import { useCallback, useEffect, useRef, useState } from 'react';

//Onsen UI
import {
    ProgressBar
} from 'react-onsenui';

//Components
import Text from '../Text';
import Riddle from '../Riddle';

//Interfaces
import IRiddle from '../../interfaces/Riddle';

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
    onPlayerLeave: () => void;
}


/**
 * Gameboard
 * 
 * @param riddles 
 * @returns 
 */
function Gameboard({ riddles, onPlayerLeave }: Props) {
    //States
    const [index, setIndex] = useState<number>(0);
    const [progress, setProgress] = useState<number>(progressTotal);
    const [isRunning, setIsRunning] = useState<boolean>(false);


    //Refs
    const inputRef = useRef<HTMLInputElement>(null);


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
        setIndex((current: number) => index + 1 !== riddles.length ? current + 1 : 0);
    }, [index, riddles.length]);


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
    const checkUserGuess = () => {
        if (inputRef?.current?.value === riddles[index].solution) {
            alert("A válasz helyes.");
            finalizeRiddle();
        } else {
            alert("A válasz helytelen.");
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
                if (confirmed) onPlayerLeave();
            }
        }

        window.addEventListener('keydown', handleEscapeKeydown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeydown);
        }
        //eslint-disable-next-line
    }, []);


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


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Bal oldali szekció */}
                <div className={styles.col}>
                    <Riddle
                        image={riddles[index]?.image}
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
