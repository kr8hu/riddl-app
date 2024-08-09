//React
import {
    useState,
    useEffect
} from 'react';

//Shared
import { appname } from '../../shared/const';

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
 * @returns
 */
function Text(props: Props) {
    //State
    const [text, setText] = useState<string>("");


    //Effects
    useEffect(() => {
        const text = getTextContent(props.node);
        setText(text);
    }, [props.node]);


    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    /**
     * onClickHandler
     * 
     * @returns 
     */
    const onClickHandler = () => props.onClick ? props.onClick() : null;


    /**
     * getTextContent
     * 
     * @param node 
     */
    const getTextContent = (node: string) => {
        let x, xmldoc, text = "";

        const parser = new DOMParser();
        const src = `${localStorage.getItem(`${appname}_strings`)}`;

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