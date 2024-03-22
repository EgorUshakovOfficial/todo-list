import { MIN_PASSWORD_LENGTH } from "../../constants";

/**
 * Ensures input that is passed into the password input meets the following criterions
 * Must be at least 8 characters
 * @param input is a string passed in
 */
export default function validatePassword(input){
    const minLength = MIN_PASSWORD_LENGTH;

    return input.length >= minLength;
}