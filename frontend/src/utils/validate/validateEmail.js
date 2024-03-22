/*
* Validates if input string passed into email input is valid or not
* @param input is a string
**/
export default function validateEmail(input){
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(input);
}