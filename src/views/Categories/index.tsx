//React
import {
    useEffect,
    useState,
    useContext
} from "react";

//Context
import { AppContext } from "../../context/App";

//Onsen UI
import ons from "onsenui";
import { Page } from "react-onsenui";

//Views
import Playroom from "../Playroom";

//Components
import Text from "../../components/Text";
import Toolbar from "../../components/Toolbar";

//Interfaces
import ICategory from "../../interfaces/Category";
import IRiddle from "../../interfaces/Riddle";

//Services
import RiddleService from "../../services/RiddleService";
import CategoryService from "../../services/CategoryService";

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
 * @param navigator 
 * @returns 
 */
function Categories({ navigator }: Props) {
    /**
     * Context
     */
    const { appState } = useContext(AppContext);


    /**
     * States
     */
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [error, setError] = useState<string | null>(null);


    /**
     * Variables
     */
    const errorTimeout = 5000;


    /**
     * getCategories
     * 
     * Kategóriák lekérése és tárolása stateben
     */
    const getCategories = async () => {
        try {
            //Kategóriák lekérése
            const response = await CategoryService.findAll();

            //Hibakezelés
            if (!response.payload) {
                setError("Hiba történt a kategóriák lekérdezésekor.");
            }

            //Kategóriák tárolása a stateben
            setCategories(response.payload);
        }
        //Hibakezelés
        catch (error) {
            setError("Hiba történt a kategóriák lekérdezésekor.");
        }
    }


    /**
     * renderCategories
     * 
     * Kategóriák megjelenítése
     * @returns 
     */
    const renderCategories = () => {
        //Ha nincsenek kategóriák, placeholder megjelenítése
        if (categories.length === 0) {
            return (
                <Text
                    className={styles.placeholder}
                    node="categories_empty" />
            )
        }

        return (
            <div className={styles.row}>
                {categories.map((category: ICategory, idx: any) => {
                    return (
                        <div
                            key={idx}
                            className={styles.col}
                            onClick={() => openCategoryHandler(category._id)}
                            data-disabled={appState.userdata.completed.includes(category._id)}>
                            <Text className={styles.title}>
                                {category.name}
                            </Text>
                            <Text className={styles.description}>
                                {category.description}
                            </Text>
                        </div>
                    )
                })}
            </div>
        )
    }


    /**
     * openCategoryHandler
     * 
     * Kategória megnyitását kezelő funkció
     * 
     * @param categoryId 
     */
    const openCategoryHandler = (categoryId: string) => {
        //Tároljuk azt, hogy a user már elvégezte-e a megnyitni kívánt kategóriát
        const isCompleted = appState.userdata.completed.includes(categoryId);

        //Vizsgálat
        if (isCompleted) {
            alert("Ezt a kategóriát már teljesítetted!");
        } else {
            openPlayroom(categoryId);
        }
    }


    /**
     * openPlayroom
     * 
     * Kiválasztott kategória rejtvényeinek lekérése és a játék indítása
     * 
     * @param cat 
     */
    const openPlayroom = async (categoryId: string) => {
        try {
            //Rejtvények lekérése
            const query = { category: categoryId };
            const response = await RiddleService.findByQuery(query);

            //A kategóriába tartozó összes rejtvény
            const categoryRiddles: Array<IRiddle> = response.payload;

            //A felhasználó által megoldott összes rejtvény
            const solvedRiddles: Array<string> | undefined = appState.userdata.solved;

            //A még meg nem oldott rejtvényeket tároló válto
            let unsolvedRiddles: Array<IRiddle> = [];

            //Ha még nem tartalmaz a kategória rejtvényeket
            if (!categoryRiddles) {
                setError("Ez a kategória jelenleg nem elérhető.");
                return;
            }

            //A már megoldott rejtvények kiszűrése a kategóriához tartozó rejtvényekből
            unsolvedRiddles = categoryRiddles.filter(
                (riddle: IRiddle, idx: number) => riddle._id !== solvedRiddles[idx]
            );

            //Navigáció
            navigator.pushPage({
                component: Playroom,
                props: {
                    categoryId,
                    riddles: unsolvedRiddles
                }
            });
        }
        //Hibakezelés
        catch (error) {
            setError("Hiba történt. Próbálkozz később.");
        }
    }


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        getCategories();
    }, []);


    /**
     * useEffect
     * 
     * Hibaüzenet megjelenítése, ha az error módosul
     */
    useEffect(() => {
        if (error) {
            ons.notification.toast(error, { timeout: errorTimeout });
        }
    }, [error]);


    return (
        <Page>
            <div className={styles.container}>
                <Toolbar
                    backButton
                    title="Válassz kategóriát" />

                {renderCategories()}
            </div>
        </Page>
    )
}

export default Categories;
