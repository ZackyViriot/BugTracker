const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateTicketInput = data => {
    let errors = {};


    //check title field
    if(isEmpty(data.title)){
        errors.title = 'title field cannot be empty'
    }else if(!Validator.isLength(data.title,{min:1,max:60})){
        errors.title = 'title field must be between 1 and 60 characters'
    }
    // check the description field 
    if(isEmpty(data.description)){
        errors.description = 'decription field cannot be empty'
    }else if(!Validator.isLength(data.description,{min:1,max:500})){
        errors.description = 'description field must be between 1 and 500 characters'
    }
    // check the severity
    if(isEmpty(data.severity)){
        errors.severity = 'severity field cannot be empty'
    }else if(!Validator.isLength(data.severity,{min:1,max:30})){
        errors.severity = 'severity must be between 1 and 30 characters'
    }
    // check the data
    if(isEmpty(data.date)){
        errors.date = 'date field cannot be empty'
    }else if(!Validator.isLength(data.date,{min:1,max:50})){
        errors.date = 'date musrt be between 1 and 50 characters'
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports = validateTicketInput