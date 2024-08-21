//React
import {
    useContext,
    useEffect
} from 'react';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import { Page } from 'react-onsenui';

//Pages
import Categories from '../Categories';
import Ranking from '../Ranking';

//Components
import Text from '../../components/Text';
import Tile from '../../components/Tile';

//Shared
import { appVersion } from '../../shared/const';

//Styles
import styles from './Home.module.css';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
}

interface IMenuItem {
    name: string;
    description?: string;
    icon: string;
    onClick?(): () => void;
}


/**
 * Home
 * 
 * Kezdő oldal
 * 
 * @param navigator 
 */
function Home({ navigator }: Props) {
    /**
     * Context
     */
    const { appState } = useContext(AppContext);


    /**
     * Variables
     */
    const menuItems: Array<IMenuItem> = [
        {
            name: "Játék",
            description: "Indítás",
            icon: "fa-play-circle",
            onClick: () => navigator.pushPage({ component: Categories })
        },
        {
            name: "Ranglista",
            description: "Megtekintés",
            icon: "fa-trophy",
            onClick: () => navigator.pushPage({ component: Ranking })
        },
        {
            name: "Statisztika",
            description: "Megtekintés",
            icon: "fa-pie-chart",
            onClick: () => alert("Jelenleg nem elérhető.")
        },
    ];


    /**
     * renderMenuItems
     * 
     * Menü elemek renderelése
     * 
     * @returns 
     */
    const renderMenuItems = () => {
        return menuItems.map((menuItem: IMenuItem, idx: number) => {
            return (
                <div key={idx} className={styles.col}>
                    <Tile
                        title={menuItem.name}
                        description={menuItem.description}
                        icon={menuItem.icon}
                        onClick={menuItem.onClick} />
                </div>
            )
        })
    }


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        //Onsen UI resetPage használata esetén jelentkező hiba bugfix
        const elem = document.querySelector("ons-navigator > ons-page") as HTMLElement;
        elem.style.display = "block";
    }, []);


    return (
        <Page>
            <div className={styles.container}>
                {/* Fejléc */}
                <Text
                    className={styles.title}
                    node="appname" />

                {/* Tartalom */}
                <div className={styles.wrapper}>
                    {/* Üdvözlő szöveg */}
                    <Text className={styles.welcome}>
                        Üdv, újra itt, {appState.userdata.username}!
                    </Text>

                    {/* Menü */}
                    <div className={styles.row}>
                        {renderMenuItems()}
                    </div>

                    {/* Verzióinfó */}
                    <Text className={styles.verinfo}>
                        {appVersion}
                    </Text>
                </div>
            </div>
        </Page>
    )
}

export default Home;
