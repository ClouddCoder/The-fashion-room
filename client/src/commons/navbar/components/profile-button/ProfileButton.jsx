import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ProductContext from "../../../../context/product-context/ProductContext";
import CustomLink from "./components/CustomLink";

function ProfileButton({ resetSession }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { resetProductState } = useContext(ProductContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Link personalizado que se renderiza como boton.
   * Usa un ref para pasar el elemento a los demas hijos.
   * https://reactjs.org/docs/forwarding-refs.html
   */

  /*
  const CustomLink = React.forwardRef((props, ref) => (
    <Link
      ref={ref}
      {...props}
      to="/"
      component="button"
      onClick={() => {
        resetSession();
        resetProductState();
        window.localStorage.removeItem("logged");
      }}
    />
  ));
  */
  const ref = React.createRef();

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          sx={{ color: "white" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AccountCircleOutlinedIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </Tooltip>
      <div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              "overflow": "visible",
              "filter": "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "mt": 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                // eslint-disable-next-line quotes
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem component={Link} to="/profile">
            Mi perfil
          </MenuItem>
          <MenuItem component={Link} to="/orders">
            Mis compras
          </MenuItem>
          <Divider />
          <MenuItem
            component={CustomLink}
            session={resetSession}
            productState={resetProductState}
            ref={ref}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default ProfileButton;
