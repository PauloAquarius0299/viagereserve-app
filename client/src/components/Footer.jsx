import "../styles/Footer.scss";
import {LocationOn, LocalPhone, Email} from '@mui/icons-material';
import payment from '../assets/payment.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-left'>
            <h1>Viage<span>Reserve</span></h1>
            </div>

            <div className='footer-center'>
                <h3>Links Usuais</h3>
                <ul>
                    <li>Sobre Nos</li>
                    <li>Termos de Condições</li>
                    <li>Termos de Privacidade</li>
                </ul>
            </div>

            <div className='footer-right'>
                <h3>Contatos</h3>
                <div className='footer-right-info'>
                    <LocalPhone />
                    <p>+55 00 987654321</p>
                </div>
                <div className='footer-right-info'>
                    <Email />
                    <p>viagereserverh@gmail.com</p>
                </div>
                <img src={payment} />
            </div>
        </div>
    )
}

export default Footer;
