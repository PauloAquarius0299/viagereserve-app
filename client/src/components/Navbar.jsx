import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <Link to='/' className='logo'>
        <h1>Viage<span>Reserve</span></h1>
      </Link>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Pesquisar ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.greenbr }}
            onClick={() => {navigate(`/properties/search/${search}`)}}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Torna-se um anfitrião
          </a>
        ) : (
          <a href="/login" className="host">
            Torna-se um anfitrião
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Acessar</Link>
            <Link to="/register">Criar conta</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Lista de Viagens</Link>
            <Link to={`/${user._id}/wishList`}>Lista de Favoritos</Link>
            <Link to={`/${user._id}/properties`}>Suas Publicações</Link>
            <Link to={`/${user._id}/reservations`}>Lista de Reservas</Link>
            <Link to="/create-listing">Torna-se um anfitrião</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Sair
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;