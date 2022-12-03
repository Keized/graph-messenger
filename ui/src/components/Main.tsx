import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthProvider";
import Login from "./Login";
import Room from "./Room";

export default function Main() {
    const { guest } = useContext(AuthContext) as AuthContextType;

    return (
        <div>
            { guest && <Room /> }
            { !guest && <Login /> }
        </div>
    );
}
