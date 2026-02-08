
/**
 * Constant for Routing manager
 */
const FW_ROUTE_MNG_CONST = {
    ROUTE : FwRoute.getRoute(),
    NF_ROUTE: FwRoute.getRoute().filter(item => "/**" === new String(item.path))[0],
    DOOM_ID: "fwBody",
    LAYOUT_PATH_PARAM_KEY: "layoutPath",
}

/**
 * Routing manager data that be init every request
 */
const FW_ROUTE_MNG_DATA = {
    package: "",
    pageError: "",
}

/**
 * Getter for Routing list
 * @returns Object[]
 */
const getROUTE = () => {
    return [...FW_ROUTE_MNG_CONST.ROUTE];
}

/**
 * Getter for DOOM_ID of doomable element
 * @returns String
 */
const getDOOM_ID = () => {
    return new String(FW_ROUTE_MNG_CONST.DOOM_ID);
}

/**
 * Getter for LAYOUT_PATH_PARAM_KEY
 * @returns String
 */
const getLAYOUT_PATH_PARAM_KEY = () => {
    return new String(FW_ROUTE_MNG_CONST.LAYOUT_PATH_PARAM_KEY);
}

/**
 * Getter for Not found page Rout object
 * @returns Object
 */
const getNF_ROUTE = () => {
    return FW_ROUTE_MNG_CONST.NF_ROUTE ? {...FW_ROUTE_MNG_CONST.NF_ROUTE} : undefined;
}

/**
 * Setter for reder package of current path
 * @param {string} package 
 */
const setPackage = (package) => {
    FW_ROUTE_MNG_DATA.package = package;
}

/**
 * Get redirect path with route data
 * @returns redirect path
 */
const getRedirectLink = (routePath) => {
    // return `${DOMAN}?${FW_ROUTE_MNG_CONST.LAYOUT_PATH_PARAM_KEY}=${routePath}`;
    return `?${FW_ROUTE_MNG_CONST.LAYOUT_PATH_PARAM_KEY}=${routePath}`;
}

/**
 * Setter for page error
 * @param {string} error 
 */
const setPageError = (error) => {
    FW_ROUTE_MNG_DATA.pageError = error;
}

/**
 * Setter for render package
 * @returns 
 */
const getPackage = () => {
    return FW_ROUTE_MNG_DATA.package;
}

/**
 * Getter for page error
 * @returns 
 */
const getPageError = () => {
    return FW_ROUTE_MNG_DATA.pageError;
}

/**
 * Add css file to render page
 * @param {string} filenPath 
 */
const addCssFile = (filenPath) => {
  // Create a new link element
  var link = document.createElement('link');

  // Set the attributes for the link element
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename; // The path to your CSS file

  // Append the link element to the head section of the document
  document.head.appendChild(link);
}


/**
 * Init page data for page render
 */
const initPageRenderInfo = () => {
    // get LAYOUT PATH
    const params = new URLSearchParams(window.location.search);
    let currentPath = params.get(getLAYOUT_PATH_PARAM_KEY());
    if (!currentPath) {
        currentPath = "/";
    }
    let isHasPath = false;
    const routePaths = getROUTE();
    
    // check exist path
    for (let r of routePaths) {
        if (r.path === currentPath) {
            setPackage(r.packagePath);
            setPageError(null);
            isHasPath = true;
            break;
        }
    }
    if (!isHasPath) {
        // get path not found
        const nfPath = getNF_ROUTE();
        if (nfPath) {
            setPackage(nfPath.component);
            setPageError(null);
        } else {
            setPackage(null);
            // TODO: constant message later
            setPageError("404: ERROR PAGE NOT FOUND");
        }
    }
    if (getPageError()) {
        renderPage(null);
    }
} 

const loadPage = () => {
    if (!getPageError()) {
        fwImport(getPackage());
    } 
}

/**
 * Inject HTML to render able item
 */
const renderPage = (component) => {
    
    // const injectHtml = getPageError()? getPageError(): getPackage().render();

    // document.getElementById(getDOOM_ID()).innerHTML = injectHtml;
    if (getPageError()) {
        document.getElementById(getDOOM_ID()).innerHTML = getPageError();
        return;
    } else {
        // const cssList = getPackage().getCss();
        // for(let css of cssList) {
        //     addCssFile(css);
        // }
        document.getElementById(getDOOM_ID()).innerHTML = component.render();
        if (component.onAfterInit) {
            component.onAfterInit();
        }
    }
}

// === FUNCTION CALL ========================================================================
initPageRenderInfo();
loadPage();