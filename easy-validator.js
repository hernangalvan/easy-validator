var easyValidator = {
		strInvalidEmail: 'Email is invalid',
		strEmptyField: 'Field is empty',
		event: 'blur',
		emailRegex: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		init: function(data){
			easyValidator.config = {
				form: $('form[easy-validate]'),
			}
			easyValidator.config.form.attr('novalidate','novalidate');
			if(typeof data !== "undefined"){
				if(typeof data.invalid_email_message !== "undefined"){
					this.strInvalidEmail = data.invalid_email_message;
				}
				if(typeof data.empty_field_message !== "undefined"){
					this.strEmptyField = data.empty_field_message;
				}
				if(typeof data.event !== "undefined"){
					if( $.inArray(data.event,['keyup','blur']) === -1 ){
						console.log('Invalid event attribute, use keyup or blur');
						return false;
					}
					easyValidator.event = data.event;
				}
			}
			var emailFields = easyValidator.config.form.find('input[type="email"]');
			var emptyFields = easyValidator.config.form.find('input[required]');
			var fields = easyValidator.config.form.find('input[required],input[type="email"]');
			fields.on('focus',this.clearError);
			emptyFields.on(easyValidator.event,this.validateEmpty);
			emailFields.on(easyValidator.event,this.validateEmail);
		},
		isValidForm: function(){
			easyValidator.config.form.find('.ev-error').remove();
			var fields = easyValidator.config.form.find('input');
			$.each(fields,function(){
				easyValidator.validateField($(this));
			})
			if(easyValidator.config.form.find('.ev-error').length>0){
				return false;
			}
			return true;
		},
		validateField: function(field){
			if(field.attr("type") === 'email'){
				easyValidator.validateEmailField(field);
			}
			if(field.attr("required") !== null){
				easyValidator.validateEmptyField(field);
			} 
		},
		validateEmptyField: function(e){
			if(e.val()==""){	
				e.after('<span class="ev-error">'+easyValidator.strEmptyField+'</span>');
				return false;
			}
		},
		validateEmailField: function(e){
		if( !easyValidator.emailRegex.test(e.val()) && e.val()!==''){
				e.after('<span class="ev-error">'+easyValidator.strInvalidEmail+'</span>');
				return false;
			}
		},
		validateEmail: function(){
			var element = $(this);
			element.next('.ev-error').remove();
			easyValidator.validateEmailField(element);
		},
		validateEmpty: function(){
			var element = $(this);
			element.next('.ev-error').remove();
			easyValidator.validateEmptyField($(element));
		},
		clearError: function(){
			$(this).next('.ev-error').remove();
		}
	}
