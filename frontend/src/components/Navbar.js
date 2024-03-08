import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
 
  const userString = localStorage.getItem("user");
  const userData = userString ? JSON.parse(userString) : null;
  const userEmail = userData ? userData.email : null;
  console.log(userEmail);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          
            <div className="emailContainer">
              <p>{userEmail}</p>
              <button onClick={()=>{localStorage.removeItem("user");localStorage.removeItem("token");navigate("/login")}}>Log out</button>
            </div>
          
         
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
        
        </nav>
      </div>
    </header>
  );
};

export default Navbar;