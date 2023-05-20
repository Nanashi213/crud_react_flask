import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LogOut(props) {
    const navigate = useNavigate();
  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token();
       navigate('/');
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">

            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default LogOut;