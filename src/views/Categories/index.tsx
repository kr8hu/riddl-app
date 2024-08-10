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
    const dummyCategories = Array.from({ length: 30 }, (_, index) => ({
        id: index,
        name: Math.round(Math.random() * 100000 + 1000),
        onClick: () => navigator.pushPage({ component: Playroom, props: { riddles: dummyData } })
    }));


    const dummyData = [
        {
            id: 0,
            image: "https://zeevector.com/wp-content/uploads/Playstation-Logo-vector-PNG.png",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            solution: "playstation",
            completed: false,
        },
        {
            id: 1,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            solution: "xbox",
            completed: false,
        },
        {
            id: 2,
            image: "https://static.wikia.nocookie.net/logopedia/images/b/b3/God_of_War_2016_%28Icon%29.svg/revision/latest?cb=20221110002755",
            description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            solution: "god of war",
            completed: false,
        },
        {
            id: 3,
            image: "https://zeevector.com/wp-content/uploads/Playstation-Logo-vector-PNG.png",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            solution: "playstation",
            completed: false,
        },
        {
            id: 4,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            solution: "xbox",
            completed: false,
        },
    ];


    return (
        <Page>
            <div className={styles.container}>
                <Toolbar
                    backButton
                    title="Válassz kategóriát" />

                <div className={styles.row}>
                    {dummyCategories.map((i, idx: any) => {
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
