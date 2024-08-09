//React
import {
    useEffect,
    useState,
    useContext,
    CSSProperties,
    useCallback
} from 'react';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import ons from 'onsenui';
import {
    Page,
    ProgressBar
} from 'react-onsenui';

//Components
import Text from '../../components/Text';

//Views
import Home from '../Home';

//Shared
import xml from '../../shared/strings.xml';
import {
    appname,
    loadingStates,
    loadingProgress,
    actionTypes
} from '../../shared/const';

//Axios
import axios from 'axios';

//Styles
import styles from './Initialize.module.css';


/**
 * Variables
 */
let timer: NodeJS.Timeout;


/**
 * Interfaces
 */
interface Props {
    navigator: any;
}

interface Message {
    type: string;
    data: any;
}


/**
 * Initialize
 * 
 * Betöltő oldal
 */
function Initialize({ navigator }: Props) {
    //Context
    const { appState, setAppState } = useContext(AppContext);


    //State
    const [progressId, setProgressId] = useState<number>(loadingProgress.init);
    const [progressLoad, setProgressLoad] = useState<any>(0);
    const [error, setError] = useState<boolean>(false);


    //Variables
    const timerValue: number = 750;
    const progressBarValue: number = error ? 0 : progressLoad;
    const progressBarSecondaryValue: number = 100;

    const wrapperStyles: CSSProperties = {
        opacity: progressLoad === 100 ? 0 : 1,
        height: progressLoad === 100 ? "300px" : "0",
    };


    /**
     * loadStringsXml
     * 
     * Szövegeket tartalmazó XML fájl betöltése
     */
    const loadStringsXml = async () => {
        const config = {
            method: 'GET',
            url: xml,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        }

        const response = await axios.request(config);

        if (response) {
            localStorage.setItem(`${appname}_strings`, response.data);
            setTimeout(() => setProgressId(current => current + 1), timerValue);
        }
    }


    /**
     * sendPostMessage
     * 
     * Üzenet küldése a szülő oldalnak az adatok átvételéhez
     */
    const sendPostMessage = () => {
        const message = {
            type: 'LAUNCHED',
            data: true
        };


        //Üzenet küldés a weboldalnak a felhasználói adatok lekéréshez
        window.parent.postMessage(message, window.location.origin);

        setTimeout(() => setProgressId(current => current + 1), timerValue);
    }


    /**
     * receivePostMessage
     * 
     * Üzenet beérkezésének és feldolgozásának vizsgálata
     */
    const receivePostMessage = () => {
        timer = setInterval(() => {
            if (appState.userdata) {
                setProgressId(current => current + 1);
                clearInterval(timer);
            }
            else {
                setError(true);
                ons.notification.toast("Hiba a felhasználói adatok betöltése közben.");
            }
        }, 1500);
    };


    /**
     * handlePostMessage
     * 
     * Weboldaltól érkezett felhasználói adatok kezelése 
     */
    const handlePostMessage = useCallback((event: MessageEvent) => {
        const message: Message = event.data;

        setAppState(actionTypes.app.SET_USERDATA, []);

        if (message.type === 'USERDATA') {
            setAppState(actionTypes.app.SET_USERDATA, message.data);
        }
    }, [setAppState]);


    /**
     * openApplication
     * 
     * Átirányítás a kezdőoldalra
     */
    const openApplication = () => {
        setTimeout(() => {
            navigator.resetPage({
                component: Home
            });
        }, 1500);
    }


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        window.addEventListener('message', handlePostMessage);

        return () => {
            window.removeEventListener('message', handlePostMessage);
        };
    }, [handlePostMessage]);


    /**
     * useEffect
     * 
     * Betöltési folyamat vezérlése
     */
    useEffect(() => {
        const totalSteps = Object.keys(loadingProgress).length;
        const progressPercentage = (progressId / (totalSteps - 1)) * 100;

        //Betöltési állapot értéke
        setProgressLoad(progressPercentage);

        //Betöltési funkciók
        switch (progressId) {
            case loadingProgress.init:
                setTimeout(() => setProgressId(current => current + 1), timerValue);
                return;

            case loadingProgress.texts:
                loadStringsXml();
                return;

            case loadingProgress.send:
                sendPostMessage();
                return;

            case loadingProgress.receive:
                receivePostMessage();
                return;

            default:
                setProgressId(loadingStates.length - 1);
                setTimeout(() => openApplication(), timerValue * 2);
                return;

        }
        //eslint-disable-next-line
    }, [progressId]);


    return (
        <Page>
            <div className={styles.container}>
                <Text
                    className={styles.title}
                    node="appname" />
                <div
                    className={styles.wrapper}
                    style={wrapperStyles}>
                    <ProgressBar
                        className={styles.progressBar}
                        indeterminate={error}
                        value={progressBarValue}
                        secondaryValue={progressBarSecondaryValue} />

                    <Text className={styles.name}>
                        {loadingStates[progressId]?.name}
                    </Text>

                    <Text className={styles.description}>
                        {loadingStates[progressId]?.description}
                    </Text>
                </div>
            </div>
        </Page>
    )
}

export default Initialize;
