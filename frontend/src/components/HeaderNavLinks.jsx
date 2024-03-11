import { Link } from "react-router-dom";
export default function HeaderNavLinks(){
    return (
        <div>
            <Link to="/log-in">Log In</Link>
            <Link to="/sign-up">Create an Account</Link>
        </div>
    );
}