//React
import { useEffect } from "react";

//Context
import { AppProvider } from "../../context/App";

//Onsen UI
import ons from "onsenui";

//Components
import Navigator from "./Navigator";


/**
 * App
 * 
 * @returns 
 */
function App() {
  /**
   * useEffect
   * 
   */
  useEffect(() => {
    ons.ready(() => {
      ons.platform.select("chrome");
      ons.disableDeviceBackButtonHandler();
    });
  }, []);


  return (
    <AppProvider>
      <Navigator />
    </AppProvider>
  );
}

export default App;
