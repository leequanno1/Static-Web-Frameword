/**
 * 
 * @param {String} itemId 
 * @param {*} data 
 */
const fwSaveLocalStorate = (itemId, data) => {
    
    const jsonData = JSON.stringify(data);
    localStorage.setItem(itemId, jsonData);
}

/**
 * 
 * @param {string} itemId 
 * @returns 
 */
const fwGetObjectFromStorate = (itemId) => {
    
    const jsonData = localStorage.getItem(itemId);
    return JSON.parse(jsonData);
}