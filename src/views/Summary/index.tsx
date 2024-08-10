//React
import { useEffect } from 'react';

//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Toolbar from '../../components/Toolbar';
import Text from '../../components/Text';

//Interfaces
import IRiddle from '../../interfaces/Riddle';
import ITableItem from '../../interfaces/TableData';

//Styles
import styles from './Summary.module.css';
import Table from '../../components/Table';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
    riddles: Array<IRiddle>;
    solved: Array<any>;
}


/**
 * Summary
 * 
 * @param param0 
 */
function Summary({ navigator, riddles, solved }: Props) {
    //Variables
    const categoryStats: Array<ITableItem> = [
        {
            name: "Összes rejtvény",
            value: riddles.length
        },
        {
            name: "Összes megoldott rejtvény",
            value: "-"
        },
        {
            name: "Teljesítettek aránya",
            value: solved.length * 100 / riddles.length
        }
    ];

    const gameStats: Array<ITableItem> = [
        {
            name: "Összes rejtvény",
            value: "-"
        },
        {
            name: "Összes megoldott rejtvény",
            value: solved.length
        },
    ];


    /**
     * useEffect
     * 
     */
    useEffect(() => {
        console.log(solved);
    }, [solved]);


    return (
        <Page>
            <div className={styles.container}>
                <Toolbar
                    backButton
                    title="Összegzés" />

                <div className={styles.wrapper}>
                    <Text
                        className={styles.title}
                        node="summary_category_stats" />

                    <Table data={categoryStats} />

                    <Text
                        className={styles.title}
                        node="summary_game_stats" />

                    <Table data={gameStats} />
                </div>
            </div>
        </Page>
    )
}

export default Summary;
