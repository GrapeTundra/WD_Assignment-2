function prefillRestaurant() {

    var params = new URLSearchParams(window.location.search);

    var restaurant = params.get('restaurant');

    if (restaurant) {
        $('#RestSelectIn').val(restaurant);
    }
}

//Deposit ammount update in reservation form

function UpdateDepositAmm() {

    var selected = $('#RestSelectIn').val();

    if (selected === 'Steves Sandwiches' || selected === 'Petes Pub Feed' || selected === 'Kevins Kebabs') {
        $('#depositAmmount').text('$0');
    }

    else if (selected === 'Bobs Breakfast') {
        $('#depositAmmount').text('$20');
    }

    else if (selected === 'Marys Mexican') {
        $('#depositAmmount').text('$3');
    }

	else if (selected === 'Garys Grilled Meat') {
        $('#depositAmmount').text(' $5');
    }

    else {
        $('#depositAmmount').text('Please select a resturant');
    }
}

function init() {

    /*Hiding specifically for the reservation page */
	$('#VouchSelected').hide();
    $('#OnMethSelected').hide();

    //Checks if there is a param in the URL to see if they came from recomendations
    prefillRestaurant();

    //Deposit ammount update in reservation form
	UpdateDepositAmm(); //initialy attempts to update deposit ammount incase it comes prefilled
	$('#RestSelectIn').change(UpdateDepositAmm);

}

$(document).ready(init);