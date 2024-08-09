//Onsen UI
import { Page } from "react-onsenui";

//Views
import Playroom from "../Playroom";

//Components
import Toolbar from "../../components/Toolbar";

//Styles
import styles from './Categories.module.css';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
}


/**
 * Categories
 * 
 * @returns 
 */
function Categories({ navigator }: Props) {
    const dummyArray = Array.from({ length: 30 }, (_, index) => ({
        id: index,
        name: Math.round(Math.random() * 100000 + 1000),
        onClick: () => navigator.pushPage({ component: Playroom })
    }));


    return (
        <Page>
            <div className={styles.container}>
                <Toolbar
                    backButton
                    title="Válassz kategóriát" />

                <div className={styles.row}>
                    {dummyArray.map((i, idx: any) => {
                        return (
                            <div
                                key={idx}
                                className={styles.col}
                                onClick={i.onClick}>
                                {i.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Page>
    )
}

export default Categories;
