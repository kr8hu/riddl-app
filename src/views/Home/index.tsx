//React
//import { useContext } from 'react';

//Context
//import { AppContext } from '../../context/App';

//Onsen UI
import { Page } from 'react-onsenui';

//Pages
import Categories from '../Categories';

//Components
import Text from '../../components/Text';
import Tile from '../../components/Tile';

//Styles
import styles from './Home.module.css';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
}

interface MenuItem {
    name: string;
    description?: string;
    icon: string;
    onClick?(): () => void;
}


/**
 * Home
 * 
 * Kezdő oldal
 */
function Home({ navigator }: Props) {
    //Context
    //const { appState } = useContext(AppContext);


    //Variables
    const menuItems: Array<MenuItem> = [
        {
            name: "Játék",
            description: "Indítás",
            icon: "fa-play-circle",
            onClick: () => navigator.pushPage({ component: Categories })
        },
        {
            name: "Ranglista",
            description: "Megtekintés",
            icon: "fa-trophy"
        },
        {
            name: "Statisztika",
            description: "Megtekintés",
            icon: "fa-pie-chart"
        },
    ];


    /**
     * renderMenuItems
     * 
     * Navigációs elemek renderelése
     * 
     * @returns 
     */
    const renderMenuItems = () => {
        return menuItems.map((menuItem: MenuItem, idx: number) => {
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


    return (
        <Page>
            <div className={styles.container}>
                <Text
                    className={styles.title}
                    node="appname" />

                <div className={styles.wrapper}>
                    <div className={styles.row}>
                        {renderMenuItems()}
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Home;
