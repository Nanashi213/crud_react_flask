
import Listproducts from "../components/Listproduct.js"
import Login from "../components/Login.js"
function Home(props) {
    return (
        <div>
            <Login />
            <Listproducts />
        </div>
    )
}

export default Home;