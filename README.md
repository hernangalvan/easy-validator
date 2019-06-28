# easy-validator
JQuery input validation of html forms the easy way. 
Right now it only validates email and required fields.

Include the js file.
Add the attribute easy-validate to the form you want to apply validation.

Initialize the plugin:

```
$(function() {
    easyValidator.init();
});
```

Prevent form submition using...

```
if(!easyValidator.isValidForm()){
    return false;
}
```
... in the form submit event.

## Options

- invalid_email_message: The message displayed under the field when email validation fails. Default is 'Email is invalid'.
- empty_field_message: The message displayed under the field when required validation fails. Default is 'Field is empty'.
- event: The event that triggers the validation in a field. Default is 'blur'. 

Example:

```
easyValidator.init({
    invalid_email_message:ObjStr.invalidUser,
    empty_field_message:ObjStr.emptyField,
    event: 'keyup',
});
```





