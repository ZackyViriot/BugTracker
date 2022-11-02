// basically this function will let you know whether or not something is empty or not , and we can export is that way it can be used throughout the whole application 



const isEmpty = (value) => 
    value === undefined || 
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0)||
    (typeof value === "string" && value.trim().length === 0);

module.exports  = isEmpty; 