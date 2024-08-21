//React
import {
    useState,
    useEffect
} from 'react';

//Shared
import { appName } from '../../shared/const';

//Styles
import styles from './Text.module.css';


/**
 * Interfaces 
 */
interface Props {
    className?: any;
    children?: any;
    node?: any;
    style?: any;
    onClick?: () => void;
}


/**
 * Text 
 * 
 * Szöveget megjelenítő komponens
 * 
 * @returns
 */
function Text(props: Props) {
    /**
     * States
     */
    const [text, setText] = useState<string>("");


    /**
     * Variables
     */
    const classNames: string = `${styles.container} ${props.className}`;


    /**
     * onClickHandler
     * 
     * @returns 
     */
    const onClickHandler = () => props.onClick ? props.onClick() : null;


    /**
     * getTextContent
     * 
     * Visszaadja a megadott nodehoz tartozó szöveges tartalmat egy tárolt XML sztringből.
     * 
     * 
     * @param {string} node - Az XML csomópont `name` attribútuma
     * @returns {string} A megfelelő XML csomópont szöveges tartalma, vagy egy üres sztring, ha nincs egyezés.
     */
    const getTextContent = (node: string) => {
        let x: any, xmldoc: any, text: string = "";

        const parser: any = new DOMParser();
        const src: string = `${localStorage.getItem(`${appName}_strings`)}`;

        xmldoc = parser.parseFromString(src, "text/xml");
        x = xmldoc.getElementsByTagName('string');

        for (let i = 0; i < x.length; i++) {
            if (node === x[i].getAttribute('name')) {
                text = `${x[i].textContent}`;
                break;
            }
        }

        return text;
    }


    /**
     * useEffect
     * 
     * Ha van megadva node, a szöveg lekérése az xml fájlból és tárolás a stateben
     */
    useEffect(() => {
        const text = getTextContent(props.node);
        setText(text);
    }, [props.node]);


    return (
        <span
            className={classNames}
            onClick={onClickHandler}
            style={props.style}>
            {props.children || text}
        </span>
    )
}

export default Text;