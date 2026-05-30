//Resturant Data
const restaurants = [
    {
        name: "Steves Sandwiches",
        budget: "1015",
        purpose: ["Fam", "Oth"],
        diet: ["Vegetarian", "Vegen", "Halal", "None"]
    },
    {
        name: "Bobs Breakfast",
        budget: "20",
        purpose: ["Prof", "Date", "Fam" , "Oth"],
        diet: ["Halal", "None"]
    },
    {
        name: "Petes Pub Feed",
        budget: "1520",
        purpose: ["Oth"],
        diet: ["Halal", "None"]
    },
    {
        name: "Garys Grilled Meat",
        budget: "1520",
        purpose: ["Date", "Prof", "Fam", "Oth"],
        diet: ["None"]
    },
    {
        name: "Marys Mexican",
        budget: "1015",
        purpose: ["Date", "Fam", "Oth"],
        diet: ["Halal", "Vegetarian", "Vegan", "None"]
    },
    {
        name: "Kevins Kebabs",
        budget: "1520",
        purpose: ["Oth", "Fam"],
        diet: ["Vegan", "Vegetarian", "Halal", "None"]
    }
];

/*Toggle Function for the restruant page */
function toggle(){
	$(this).parent().parent().next().slideToggle();

	if($(this).html() == "[-]"){
		$(this).html("[+]")
	}else{
		$(this).html("[-]")
	}
}


/*function for "same as email address" button in reservations */
function SameAdd () {

    if ($(this).is(':checked')) {
            
        $('#BillAdd').val($('#EmailIn').val());

            
        $('#BillAdd').prop('readonly', true);
    } else {
            
        $('#BillAdd').val('')
        $('#BillAdd').prop('readonly', false);
            
        }

    };



//Recomendations based on input function
function RecomRests(){
	$('#recommendationText').text('');
   
    var budget = $('input[name="BudgetRange"]:checked').val();
    var purpose = $('input[name="DinePurp"]:checked').val();
    var diets = [];


    $('input[name="DiatryPref"]:checked').each(function () {
        diets.push($(this).val());
    });

    // Checks preferences to the restaurants variables
    var matches = restaurants.filter(function (restaurant) {
							//Treats nothing as a match
        var budgetMatch = !budget || restaurant.budget === budget;

        var purposeMatch =
            !purpose || restaurant.purpose.indexOf(purpose) !== -1;

        var dietMatch =
            diets.length === 0 ||
            diets.some(function (diet) {
                return restaurant.diet.indexOf(diet) !== -1;
            });

        return budgetMatch &&
               purposeMatch &&
               dietMatch;
    });

    // Print recommendations
    if (matches.length > 0) {

    var restaurantLinks = matches.map(function (restaurant) {

        return '<a href="reservation.html?restaurant=' +
            encodeURIComponent(restaurant.name) +
            '">' +
            restaurant.name +
            '</a>';

    });

    $('#RecomRests').html(
        'Recommended restaurants:<br>' +
        restaurantLinks.join('<br>')
    );

} else {

    $('#recommendationText').text(
        'No restaurants match your preferences.'
    );
}
}

//Toggling between voucher and credit card
function ToggleVaC(){
	var selectedMethod = $('input[name="DepoMethod"]:checked').val();

    $('#VouchSelected').slideUp();
    $('#OnMethSelected').slideUp();


    if (selectedMethod === 'Voucher') {

        $('#VouchSelected').slideDown();

    } else if (selectedMethod === 'OnlineMeth') {

        $('#OnMethSelected').slideDown();
    }
}

//Reservation form validation
function ResValidate (){
		//inputs of the Registration form
	var FullName = $("#FullNameIn").val();
	var Email = $("#EmailIn").val();
	var PhoneNum = $("#PhoneNumIn").val();

	var Rest = $("#RestSelectIn").val();

	var DateIn = $("#ResDateIn").val();
	var TimeIn = $("#ResTimeIn").val();

	var NumPeople = $("#NumPeopleIn").val();

	var Vouch = $("#VoucherIn").prop("checked");
	var OnlinePay = $("#OnMethIn").prop("checked");

	var VouchIn = $("#VouchIn").val();

	var OnlinePayIn = $("#CredIn").val();

	var BillingAdd = $("#BillAdd").val();


	//variables for validation
	var errMsg = "";								
	var result = true;
	
	//patterns 
	

	var EmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
	var phoneNumberPattern = /^\d{8,15}$/;
	var VouchLength = /^\d{12}$/;
	var CardLength = /^\d{15,16}$/;
	


	//checking if fields are left empty
	if(FullName == ""){
		errMsg += "Please enter your full name.\n";
	}

	if(Email == ""){
		errMsg += "Email cannot be empty.\n";
	}

	if(PhoneNum == ""){
		errMsg += "Phone Number cannot be empty.\n";
	}

	if(Rest == ""){
		errMsg += "Please select a restaurant.\n";
	}

	if(DateIn == ""){
		errMsg += "Please enter a date\n";
	}

	if(TimeIn == ""){
		errMsg += "Please enter a time\n";
	}

	if(NumPeople == ""){
		errMsg += "Please input number of people for reservation\n";
	}

	if(!Vouch && !OnlinePay){
		errMsg += "Please Select payment method\n";
	}

	if(Vouch && VouchIn == ""){
		errMsg += "Please Enter a voucher\n";
	}

	if(OnlinePay && OnlinePayIn == ""){
		errMsg += "Please Enter card details\n";
	}

	if(BillingAdd == ""){
		errMsg += "Please Enter a billing address\n";
	}

	//check to see if the date and time are in the past
	if (DateIn !== "" && TimeIn !== "") {

    var ReserveDate = new Date(DateIn + "T" + TimeIn);

    var now = new Date();

    if (ReserveDate < now) {
        errMsg +="Reservation date/time cannot be in the past.\n";
    }
}


	//pattern match checks

	if(!Email.match (EmailPattern)){
		errMsg += "Email must be formated as name@example.com\n"
	}

	if(!PhoneNum.match (phoneNumberPattern)){
		errMsg += "Phone number must be between 8 and 15 digits\n"
	}

	if(Vouch && !VouchIn.match(VouchLength)){
		errMsg += "Voucher must be 12 digits\n"
	}

	if(OnlinePay && !OnlinePayIn.match(CardLength)){
		errMsg += "Online Payment must be 15 (amex) or 16 (Master/visa) characters long\n"
	}
	//Other checks

	if(NumPeople <= 0){
		errMsg += "Number of people must be greater then 0\n"
	}

	if (errMsg != "") {
		alert (errMsg);
		result = false;
	} 
	return result;
	
}

//Regestration form validation
function RegValidate (){
	//inputs of the Registration form
	var UName = $("#UnameIn").val();
	var Email = $("#EmailIn").val();
	var PhoneNum = $("#PhoneNumIn").val();
	var Pwd1 = $("#pwd1").val();
	var Pwd2 = $("#pwd2").val();

	var genm = $("#genm").prop("checked");
	var genf = $("#genf").prop("checked");
	var geno = $("#geno").prop("checked");

	var Veg = $("#Veg").prop("checked");
	var Vege = $("#Vege").prop("checked");
	var Halal = $("#Hal").prop("checked");
	var None = $("#Non").prop("checked");

	var Location = $("#LocationIn").val();

	//variables for validation
	var errMsg = "";								
	var result = true;
	
	//patterns 
	
	var UnamePattern = /^[A-Za-z0-9_]{5,}$/;
	var EmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
	var phoneNumberPattern = /^\d{8,15}$/;

	//password checks
	var pwdLength = /^.{10,}$/;
	var upperCase = /[A-Z]/;
	var lowerCase = /[a-z]/;
	var numberChar = /\d/;
	var specialChar = /[^A-Za-z0-9]/;

	//checking if fields are left empty
	if(UName == ""){
			errMsg += "Username cannot be empty.\n";
	}

	if(Email == ""){
			errMsg += "Email cannot be empty.\n";
	}

	if(PhoneNum == ""){
			errMsg += "Phone Number cannot be empty.\n";
	}

	if(Pwd1 == ""){
			errMsg += "Password cannot be empty.\n";
	}

	if(Location == ""){
			errMsg += "Please enter country/Region\n";
	}


	if (!genm && !genf && !geno) {
    	errMsg += "A gender must be selected.\n";
	}

	if (!Veg && !Vege && !Halal && !None) {
    errMsg += "Please select your dietary preference\n";
	}

	//pattern match checks
	if(!UName.match (UnamePattern)){
		errMsg += "Username must have at least 5 characters, letters, numbers, and underscores only\n";
	}

	if(!Email.match (EmailPattern)){
		errMsg += "Email must be formated as name@example.com\n"
	}

	if(!PhoneNum.match (phoneNumberPattern)){
		errMsg += "Phone number must be between 8 and 15 digits\n"
	}

	//password checks
	if (!Pwd1.match(pwdLength)) {
    errMsg +=
    "Password must be at least 10 characters long.\n";
	}

	if (!Pwd1.match(upperCase)) {
		errMsg += "Password must contain at least 1 uppercase letter.\n";
	}

	if (!Pwd1.match(lowerCase)) {
		errMsg += "Password must contain at least 1 lowercase letter.\n";
	}

	if (!Pwd1.match(numberChar)) {
		errMsg += "Password must contain at least 1 number.\n";
	}

	if (!Pwd1.match(specialChar)) {
		errMsg += "Password must contain at least 1 special character.\n";
	}

	//checking if passwords match
	if(Pwd2 !== Pwd1){
		errMsg += "Passwords do not match.\n";
	}


	if (errMsg != "") {
		alert (errMsg);
		result = false;
	} 
	return result;
}




function init () {
	

	/*Toggle Function for the restruant page */
	$(".collapse").click(toggle);

	/*function for "same as email address" button in reservations */
 	$('#BillAddSameIn').change(SameAdd);

	//Recomendations based on input function
	$('#RecomendBut').click(RecomRests)
	
	//Changing between Voucher and credit card
	$('input[name="DepoMethod"]').change(ToggleVaC);

	//Reservation Validation
	$('#resform').submit(ResValidate);

	//Regestration Validation
    $('#regform').submit(RegValidate);

}

$(document).ready(init);