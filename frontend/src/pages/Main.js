import FormProduct from "../components/Formproduct.js";
import Listproducts from "../components/Listproduct.js";
import LogOut from "../components/LogOut.js";
import { TokenContext } from '../TokenContext';
import { useContext } from 'react';

function Main() {
    const { token,removeToken } = useContext(TokenContext);
    return (
        <div>
            <LogOut token={removeToken}/>
            <FormProduct token={token} />
            <Listproducts token={token} />
        </div>
    )
}

export default Main;