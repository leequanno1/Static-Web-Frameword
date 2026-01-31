/**
 * 
 * @param {String} itemId 
 * @param {*} data 
 */
const saveLocalStorate = (itemId, data) => {
    
    const jsonData = JSON.stringify(data);
    localStorage.setItem(itemId, jsonData);
}

/**
 * 
 * @param {string} itemId 
 * @returns 
 */
const getObjectFromStorate = (itemId) => {
    
    const jsonData = localStorage.getItem(itemId);
    return JSON.parse(jsonData);
}