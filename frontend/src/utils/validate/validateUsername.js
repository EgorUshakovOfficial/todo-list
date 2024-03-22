
/**
 * Ensures username consists of uppercase letters, lowercase letters, digits, and underscores.
 * @param input is a string passed in
 */
export default function validateUsername(input){
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return usernamePattern.test(input);
}