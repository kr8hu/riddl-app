# Riddl (app)

## Leírás

A **Riddl** egy interaktív játék, ahol a felhasználóknak képek és logók alapján kell megválaszolniuk a kérdéseket. A játék célja, hogy minél több helyes választ adjanak a bemutatott képek alapján.

## Képernyőkép
<div style="display: block; box-sizing: border-box;">
<img src="/documents/screenshots/screencapture.gif" width="480px" height="auto">
</div>

## Telepítés

A szükséges csomagok telepítéséhez futtasd az alábbi parancsot:
```bash
npm install
```

## Használat
A játék használatához először is szükség van a Riddl API elindítására, amely egy másik repositoryban található. 

Ezután hozz létre a főkönyvtárban egy .env konfigurációs fájlt, ami az alábbi környezeti változókat kell tartalmazza:
```bash
REACT_APP_SERVER_IP_DEV=127.0.0.1
REACT_APP_SERVER_PORT_DEV=3001
REACT_APP_SERVER_IP_PROD=0.0.0.0
REACT_APP_SERVER_PORT_PROD=0
REACT_APP_SERVER_PROTOCOL=http
```

Ezt követően két lehetőség választható:

### I. WordPress oldalba integrálva
Első lépésként a wordpress oldalnak a játékhoz készített, egyedi sablont kell használnia. Ez egy másik repositoryban található.

Futtasd az alábbi parancsot a build fájlok generálásához:
```bash
npm run build
```

Ezután másold a build mappa tartalmát a WordPress oldal következő könyvtárába:
```bash
wp-content/app/game
```

### II. NPM futtattással
Nyisd meg a 
```bash
src/views/Inititalize 
```
mappában található komponens kódját, és keresd meg a következő kódrészletet:
```bash
const [localdata, setLocaldata] = useState<any>(/* {
    username: 'admin',
    email: 'admin@127.0.0.1',
    role: 10
} */);
```
Távolítsd el a komment jeleket a fenti részletből, és mentsd el a fájlt.

Indítsd el az alkalmazást az alábbi parancs futtatásával:
```bash
npm run start
```


