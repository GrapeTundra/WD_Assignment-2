Structure:
Index; Home page, with info about the 'organisation'
recommend; Recomendation page, that has a form to recomend websites
register; allows user to register to the organisation
reservation; allows user to make a reservation for one of the 6 listed resturants
resturants; has a list of 6 resturants with imgs

Repo Link: https://github.com/GrapeTundra/WD_Assignment-2

JS validation logic explanation:
Reservation form validation:
Checks that all inputs aren't blank
Checks to see if the date isn't in the past, if it is, gives an error
makes sure emails have an @, and a ., following example@email.com
Makes sure phone number is between 8 and 15 digits
if voucher is selected checks that input is 12 digits
If onlinepaymnent is selected makes sure that it is either 15 or 16 digits to fit Amex/Master/Visa cards
Makes sure number of people is >0

Registeration form validation:
Checks that all inputs aren't blank
Makes sure username is at least 5 characters and has only numbers, letters or underscores
makes sure emails have an @, and a ., following example@email.com
Makes sure phone number is between 8 and 15 digits
Checks password length
Makes sure that password has 1 uppercase, 1 lower case, 1 number, and at least 1 special character (with individual alerts for each)
Checks that passwords match


Known issues/limitations:
    The Reservation page's 'same as email address' does not live update if you change the email address annd requires re-checking the box
    if you tick none under Recomendations it will show all of them
    There is nothing that tells you rules about validation (ran out of time, i procrastinated this too hard :(), but alerts are clear)

References:
All images on resturants.html are sourced from https://stock.adobe.com/

