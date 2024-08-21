//React
import React from 'react';

//Onsen UI
import * as Ons from 'react-onsenui';

//Views
import Initialize from '../../../views/Initialize';

//Shared
import {
    animationTypes
} from '../../../shared/const';


/**
 * Navigator 
 * 
 * Ez a komponens kezeli az oldalak közti navigációt
 * 
 * @returns
 */
function Navigator() {
    //Elsőként megjelenített oldal
    const initialRoute = { component: Initialize };


    /**
     * renderPage
     * 
     * @see https://onsen.io/v2/api/react/Navigator.html
     * @param {*} route 
     * @param {*} navigator 
     * @returns 
     */
    const renderPage = (route: any, navigator: any) => {
        const props = route.props || {};
        props.navigator = navigator;

        return React.createElement(route.component, props);
    }
    

    return (
        <React.Fragment>
            <Ons.Navigator
                animation={animationTypes.FADE}
                initialRoute={initialRoute}
                renderPage={renderPage} />
        </React.Fragment>
    );
}

export default Navigator;