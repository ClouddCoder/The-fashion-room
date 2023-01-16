import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./Footer.css";

/**
 * Component that renders the footer.
 * @returns {JSX.Element} Footer
 */
function Footer() {
  return (
    <footer>
      <div className="footer">
        <div>
          <span className="footer__subtitle">Conócenos</span>
          <ul>
            <li className="footer__link">
              <a href="#">Trabaja en Lottus</a>
            </li>
            <li className="footer__link">
              <a href="#">Blog</a>
            </li>
            <li className="footer__link">
              <a href="#">Acerca de Lottus</a>
            </li>
          </ul>
        </div>
        <div>
          <span className="footer__subtitle">Gana dinero con nosotros</span>
          <ul>
            <li className="footer__link">
              <a href="#">Vender productos en Lottus</a>
            </li>
            <li className="footer__link">
              <a href="#">Programa de afiliados</a>
            </li>
          </ul>
        </div>
        <div>
          <span className="footer__subtitle">Productos de pago</span>
          <ul>
            <li className="footer__link">
              <a href="#">Compra con puntos</a>
            </li>
            <li className="footer__link">
              <a href="#">Recarga tu saldo</a>
            </li>
            <li className="footer__link">
              <a href="#">Conversor de divisas de Lottus</a>
            </li>
          </ul>
        </div>
        <div>
          <span className="footer__subtitle">Redes sociales</span>
          <ul className="social-media">
            <li className="footer__link">
              <a href="#">
                <FacebookIcon />
              </a>
            </li>
            <li className="footer__link">
              <a href="#">
                <InstagramIcon />
              </a>
            </li>
            <li className="footer__link">
              <a href="#">
                <TwitterIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
