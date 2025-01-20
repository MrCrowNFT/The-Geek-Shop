import logo from "../assets/Logo(W).png"

const Navbar = ()=>{
    return(
        <>
        <div className="nav">

            <img id="logo" src={logo} alt="Marketplace Logo"></img>
            <span className="navbar_separator"></span>
            <a>Home</a>
            </div></>
    )
}

export default Navbar