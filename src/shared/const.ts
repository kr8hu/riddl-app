/**
 * App version
 * 
 */
export const appname = "Riddl";
export const appversion = "0.0.0";


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
export const url = `${process.env.REACT_APP_SERVER_PROTOCOL}://${server.dev}/`;


/**
 * Action Types
 */
export const actionTypes = {
    app: {
        SET_USERDATA: 'APP_SET_USERDATA',
    }
}


/**
 * Animation Types
 */
export const animationTypes = {
    LIFT: "lift",
    SLIDE: "slide",
    FADE: "fade"
}


/**
 * Loading States
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
        id: -1,
        name: "Kész",
        description: "Adatok betöltve, alkalmazás megnyitása"
    }
];


/**
 * Loading Progresses
 */
export const loadingProgress = {
    init: 0,
    texts: 1,
    send: 2,
    receive: 3,
    completed: -1
}


/**
 * Request Methods
 */
export const requestMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}