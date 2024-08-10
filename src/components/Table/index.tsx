//Interfaces
import ITableItem from '../../interfaces/TableData';

//Styles
import styles from './Table.module.css';


/**
 * Interfaces
 */
interface Props {
    data: Array<ITableItem>
}


/**
 * Table
 * 
 * @returns 
 */
function Table({ data }: Props) {
    return (
        <div className={styles.container}>
            {data.map((i: ITableItem, idx: number) => {
                return (
                    <>
                        <div key={idx} className={styles.row}>
                            <div className={styles.col}>
                                {i.name}
                            </div>
                            <div className={styles.col}>
                                {i.value}
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Table;
