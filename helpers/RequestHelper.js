
module.exports =  {
	validateRequired: function(req, rules){
		console.log("notmsep", rules)
		var errors = "";

		for (x in rules){
			if(!req.body.hasOwnProperty(x)){
				errors += "'" + x + "'" + " is required\n";
			}
		}

		return errors;
	},
	validateNotEmpty: function(req, rules){
console.log("notmep", rules)
		var errors = "";

		for(x in rules){
			if(req.body.hasOwnProperty(x) && (req.body[x] == "" || req.body[x] == null)){
				errors += "'" + x + "'" + " cannot be empty\n";
			}
		}

		return errors;
	},
	validatePasswordAndConfirmPassword : function(req){

		if( !req.body.hasOwnProperty("password") || !req.body.hasOwnProperty("confirm_password")){
			return "Password and confirm password donot match.\n";
		}

		if(req.body.password != req.body.confirm_password){
			return "Password and confirm password should match.\n";	
		}

		return "";
	},
	validateNewPasswordAndConfirmPassword : function(req){

		if( !req.body.hasOwnProperty("new_password") || !req.body.hasOwnProperty("confirm_password")){
			return "New password and confirm password donot match.\n";
		}

		if(req.body.new_password != req.body.confirm_password){
			return "New password and confirm password should match.\n";	
		}

		return "";
	},
	validatePasswordRules : function(req){

		if(!req.body.hasOwnProperty("password")){
			return "Password not provided.";
		}

		if(req.body.password.length < 3){
			return "Password should be more than 3 characters.\n"
		}

		return "";
	}
} 