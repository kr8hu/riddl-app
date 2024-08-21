//Interfaces
import IUserdata from "../interfaces/Userdata";


/**
 * App version
 * 
 */
export const appName = "riddl";
export const appVersion = "0.5";
export const versionCode = 1;


/**
 * Server
 * 
 */
export const server = {
    dev: `${process.env.REACT_APP_SERVER_IP_DEV}:${process.env.REACT_APP_SERVER_PORT_DEV}`,
    prod: `${process.env.REACT_APP_SERVER_IP_PROD}:${process.env.REACT_APP_SERVER_PORT_PROD}`,
};


/**
 * Url
 * 
 */
export const url: string = `${process.env.REACT_APP_SERVER_PROTOCOL}://${server.dev}/`;


/**
 * Action Types
 * 
 */
export const actionTypes = {
    app: {
        SET_USERDATA: 'APP_SET_USERDATA',
    }
}


/**
 * Animation Types
 * 
 */
export const animationTypes = {
    LIFT: "lift",
    SLIDE: "slide",
    FADE: "fade"
}


/**
 * Loading States
 * 
 */
export const loadingStates = [
    {
        id: 0,
        name: "Betöltés",
        description: "Alkalmazásadatok betöltésének megkezdezése"
    },
    {
        id: 1,
        name: "Betöltés",
        description: "Szöveges tartalmak betöltése"
    },
    {
        id: 2,
        name: "Kapcsolódás",
        description: "Adatok küldése a weboldal felé"
    },
    {
        id: 3,
        name: "Kapcsolódás",
        description: "Adatok fogadása a weboldaltól"
    },
    {
        id: 4,
        name: "Kommunikáció a szerverrel",
        description: "Verzió ellenörzése"
    },
    {
        id: 5,
        name: "Kommunikáció a szerverrel",
        description: "Felhasználói adatok ellenörzése"
    },
    {
        id: -1,
        name: "Kész",
        description: "Adatok betöltve, alkalmazás megnyitása"
    }
];


/**
 * Loading Progresses
 * 
 */
export const loadingProgress = {
    init: 0,
    texts: 1,
    send: 2,
    receive: 3,
    check: 4,
    connect: 5,
    completed: -1
}


/**
 * initialUserdata
 * 
 */
export const initialUserdata: IUserdata = {
    _id: '',
    username: '',
    email: '',
    role: 0,
    completed: [],
    solved: [],
    points: 0,
}