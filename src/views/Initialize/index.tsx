//React
import {
    useEffect,
    useState,
    useContext,
    CSSProperties,
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
    appName,
    actionTypes,
    loadingStates,
    loadingProgress,
    versionCode,
} from '../../shared/const';

//Services
import UserService from '../../services/UserService';
import ConfigurationService from '../../services/ConfigurationService';

//Interfaces
import IConfiguration from '../../interfaces/Configuration';

//Etc
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
 * 
 * @param navigator 
 */
function Initialize({ navigator }: Props) {
    /**
     * Context
     */
    const { setAppState } = useContext(AppContext);


    /**
     * States
     */
    const [progressId, setProgressId] = useState<number>(loadingProgress.init);
    const [progressLoad, setProgressLoad] = useState<any>(0);
    const [error, setError] = useState<string | undefined>(undefined);
    const [localdata, setLocaldata] = useState<any>(/* {
        username: 'admin',
        email: 'admin@127.0.0.1',
        role: 10
    } */);


    /**
     * Variables
     */
    //Betöltés állapotát jelző értékek
    const progressBarValue: number = error ? 0 : progressLoad;
    const progressBarSecondaryValue: number = 100;

    //Hibaüzenet láthatóságának időhossza
    const errorTimeout: number = 30000;

    //Következő folyamat léptetésének késleltetése
    const delayTime: number = 750;

    //CSS kezelése a betöltés állapotában függvényében
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
            //Szöveges tartalmak tárolása a localStorageban
            localStorage.setItem(`${appName}_strings`, response.data);

            //Betöltési folyamat léptetése
            setTimeout(() => setProgressId(current => current + 1), delayTime);
        }
    }


    /**
     * sendPostMessage
     * 
     * Üzenet küldése a wordpress oldal felé az adatok átvételéhez
     */
    const sendPostMessage = () => {
        //Adatok
        const message = {
            type: 'LAUNCHED', //Kód
            data: true //Jelzés hogy elindult az app az iframe-ben.
        };

        //Küldés
        window.parent.postMessage(message, window.location.origin);

        //Betöltési folyamat léptetése
        setTimeout(() => setProgressId(current => current + 1), delayTime);
    }


    /**
     * receivePostMessage
     * 
     * Üzenet beérkezésének és feldolgozásának vizsgálata
     */
    const receivePostMessage = () => {
        timer = setInterval(() => {
            //Ha érkeztek adatok a wordpress oldaltól
            if (localdata) {
                //Betöltési folyamat léptetése
                setProgressId(current => current + 1);

                //Időzítő leállítása 
                clearInterval(timer);
            }
            //Hibakezelés
            else {
                setError("Hiba történt az autentikációs adatok betöltése közben. (ERR::LOCAL_DATA_UNDEFINED)");
            }
        }, 1500);
    };


    /**
     * handlePostMessage
     * 
     * Weboldaltól érkezett felhasználói adatok kezelése 
     */
    const handlePostMessage = (event: MessageEvent) => {
        //Adatok átvétele
        const message: Message = event.data;

        //Ha a wordpress oldal viszontválaszt küldött
        if (message.type === 'USERDATA') {
            //Wordpress felhasználói fiók adatainak mentése a statebe
            setLocaldata(message.data);
        }
    };


    /**
     * checkApiVersion
     * 
     * API által megkövetelt verzió ellenörzése
     * ezzel elkerülvén a becachelt régi verzióval való használatot, ami hibákat eredményezhet.
     */
    const checkApiVersion = async () => {
        try {
            //Feltétel
            const query = { type: "main" };

            //Konfiguráció lekérése és tárolása
            const response = await ConfigurationService.findByQuery(query);
            const configuration: IConfiguration = response.payload;

            //Vizsgálat
            if (!configuration) {
                setError("Hiba történt a verziókód ellenörzése köben. (ERR::CHECK_VERSION_CODE)");
            } else {
                //Ha nem felel meg az api megkövetelt verziószáma az app verziójával
                if (configuration.versionCode !== versionCode) {
                    setError("Az alkalmazás elavult. Frissítsd az oldalt és a gyorsítótárat. (ERR::DEPRECATED_APPLICATION)");
                    return;
                }

                //Betöltési folyamat léptetése
                setTimeout(() => setProgressId(current => current + 1), delayTime);
            }
        }
        //Hibakezelés
        catch (error) {
            setError("Hiba történt. Próbálkozz később. (ERR::UNKNOWN_ERROR)");
        }
    }


    /**
     * requestUserdata
     * 
     * Felhasználói adatok lekérése az API-tól
     */
    const requestUserdata = async () => {
        try {
            //Felhasználói adatok lekérése a wordpress oldaltól kapott username alapján
            const response = await UserService.findByUsername(localdata.username);
            const userdata = response.payload;

            //Ha nem létezik a felhasználó
            if (!userdata) {
                //Felhasználó létrehozása
                createAccount();
                return;
            }

            //Felhasználói adatok betöltése az appba
            setAppState(actionTypes.app.SET_USERDATA, userdata);

            //Betöltési folyamat léptetése
            setTimeout(() => setProgressId(current => current + 1), delayTime);
        }
        catch (error) {
            setError("Hiba történt. Próbálkozz később.  (ERR::UNKNOWN_ERROR)");
        }
    }


    /**
     * createAccount
     * 
     * Felhasználói fiók létrehozása
     */
    const createAccount = async () => {
        try {
            //Felhasználó létrehozása
            const response = await UserService.create(localdata);
            const userdata = response.payload;

            //Ha nem sikerült létrehozni a felhasználói fiókot
            if (!userdata) {
                setError("Hiba történt a játékos profil létrehozása közben. (ERR::CREATE_ACCOUNT)");
                return;
            }

            //Felhasználói adatok betöltése az appba
            setAppState(actionTypes.app.SET_USERDATA, userdata);

            //Betöltési folyamat léptetése
            setTimeout(() => setProgressId(current => current + 1), delayTime);
        }
        catch (error) {
            setError("Hiba történt. Próbálkozz később. (ERR::UNKNOWN_ERROR)");
        }
    }


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
    }, []);


    /**
     * useEffect
     * 
     * Betöltési folyamat vezérlése
     */
    useEffect(() => {
        //Összes betöltési folyamat száma
        const totalSteps = Object.keys(loadingProgress).length;

        //Betöltési állapot százalékban való meghatározása
        const progressPercentage = (progressId / (totalSteps - 1)) * 100;

        //Betöltési állapot értéke
        setProgressLoad(progressPercentage);


        //Betöltési fázisokban lefutó funkciók
        switch (progressId) {
            case loadingProgress.init:
                setTimeout(() => setProgressId(current => current + 1), delayTime);
                return;

            case loadingProgress.texts:
                loadStringsXml();
                return;

            case loadingProgress.send:
                sendPostMessage();
                return;

            case loadingProgress.check:
                checkApiVersion();
                return;

            case loadingProgress.receive:
                receivePostMessage();
                return;

            case loadingProgress.connect:
                requestUserdata();
                return;

            default:
                setProgressId(loadingStates.length - 1);
                setTimeout(() => openApplication(), delayTime * 2);
                return;

        }
        //eslint-disable-next-line
    }, [progressId]);


    /**
     * useEffect
     * 
     * Hiba vizsgálata és kezelése
     */
    useEffect(() => {
        if (!error) return;

        ons.notification.toast(error, { timeout: errorTimeout });
    }, [error]);


    return (
        <Page>
            <div className={styles.container}>
                {/* Cím */}
                <Text
                    className={styles.title}
                    node="appname" />

                {/* Tartalom */}
                <div
                    className={styles.wrapper}
                    style={wrapperStyles}>
                    {/* Betöltés állapota */}
                    <ProgressBar
                        className={styles.progressBar}
                        indeterminate={error ? true : false}
                        value={progressBarValue}
                        secondaryValue={progressBarSecondaryValue} />

                    {/* Betöltési folyamat neve */}
                    <Text className={styles.name}>
                        {loadingStates[progressId]?.name}
                    </Text>

                    {/* Betöltési folyamat leírása */}
                    <Text className={styles.description}>
                        {loadingStates[progressId]?.description}
                    </Text>
                </div>
            </div>
        </Page>
    )
}

export default Initialize;
