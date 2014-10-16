/*
    app.js
    application script for the JavaScript and Forms Demo
*/

"use strict";

/* onReady()
* Called when the DOM is loaded and ready for manipulation.
* We need to populate the class standing select based on the standings array
* and add an event listener for the form's submit event
* */
function onReady() {
    var standings = [
        {
            code: 'f',
            displayText: 'Freshman'
        },
        {
            code: 'so',
            displayText: 'Sophomore'
        },
        {
            code: 'jr',
            displayText: 'Junior'
        },
        {
            code: 'sr',
            displayText: 'Senior'
        },
        {
            code: 'ss',
            displayText: 'Super Senior!'
        }
    ];
    var personForm = document.getElementById('person-form');
    var standingsSelect =  personForm.elements['standing'];
    var idx;
    var option;
    var standing;

    for (idx = 0; idx < standings.length; idx++) {
        option = document.createElement('option');
        standing = standings[idx];
        option.value = standing.code;
        option.innerHTML = standing.displayText;
        standingsSelect.appendChild(option);
    }

    personForm.addEventListener('submit', onSubmit);
} //onReady()

/* onSubmit()
 * Called when the user attempts to submit the form
 * The browser will pass an event object as the first parameter and we can use this object
 * to stop the form from being submitted if it is invalid.
 * Also the keyword 'this' will refer to the form that is being submitted while inside this function.
 * */
function onSubmit(evt) {
    var valid = validateForm(this);

    if (!valid) {
        var errMsg = document.getElementById('error-message');
        errMsg.innerHTML = 'Please provide values for the required fields!';
        errMsg.style.display = 'block';
    }

    //if the form is invalid and the event object has a method called preventDefault,
    //call it to stop the form from being submitted to the server
    //this method is now part of the standard, but it's new, so older browsers
    //will not expose this method on the event object
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    //some older browsers will look at the returnValue property of the event object
    //while other older browsers will pay attention to the value returned from
    //the event handler function itself
    //to catch both cases, we will set the returnValue property to our valid variable
    //AND return the valid variable's value from our function
    evt.returnValue = valid;
    return valid;
} //onSubmit()


/* validateForm()
* This function validates the form's information and returns true if the form is valid or false if the form is invalid.
* It will also let the user know which fields are invalid.
* parameters:
*   form    reference to the form that needs to be validated
* */
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'standing', 'age', 'email'];
    var i;
    var valid = true;

    for (i = 0; i < requiredFields.length; i++) {
        valid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    return valid;

} //validateForm()

/* validateRequiredField()
* This function validates a field that is required. If the field does not have a value, or has only spaces,
* it will mark the field as invalid and return false. Otherwise it will return true.
* */
function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;

    if (valid ) {
        field.className = 'form-control'
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;

} //validateRequiredField()

document.addEventListener('DOMContentLoaded', onReady);
