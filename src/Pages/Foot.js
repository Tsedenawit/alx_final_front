import {
  Envelope,
  Telephone,
  GeoAltFill,
  Facebook,
  Twitter,
  Linkedin,
  Telegram,
} from "react-bootstrap-icons";
export default function Foot() {
  return (
    <footer className="footer-distributed mt-36">
      <div className="footer-left">
        <img src="../images/logos.jpg" style={{ width: 200, height: 100 }} />

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>

          <a href="#">Reserve</a>

          <a href="#">News</a>

          <a href="#">Buses</a>

          <a href="#">Partners</a>

          <a href="#">Login</a>
        </p>

        <p className="footer-company-name">Hulu Bus © 2023</p>
      </div>

      <div className="footer-center">
        <div className="flex mt-[30px]">
          {/* <i className="fa fa-map-marker"></i> */}
          <GeoAltFill />
          <p>
            <span>444 S. Cedros Ave</span> Addis Ababa, Ethiopia
          </p>
        </div>

        <div className="flex mt-[30px]">
          {/* <i className="fa fa-phone"></i> */}
          <Telephone />
          <p>+251 912345678</p>
        </div>

        <div className="flex mt-[30px]">
          {/* <i className="fa fa-envelope"></i> */}
          <Envelope />
          <p>
            <a href="mailto:support@company.com">Hulubus@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className="footer-icons">
          <a>
            <i class="fa fa-linkedin"></i>
            <Linkedin
              size={30}
              className="mr-4 bg-slate-300 rounded-10px text-slate-600"
            />
          </a>
          <a>
            <Facebook
              size={30}
              className="mr-4 bg-slate-100 rounded-20px text-slate-600 "
            />
          </a>
          <a>
            <Twitter
              size={30}
              className="mr-4 bg-slate-600 rounded-full text-slate-100"
            />
          </a>
          <a>
            <i class="fa fa-twitter"></i>
            <Telegram
              size={30}
              className="mr-4 bg-slate-100 rounded-20px text-slate-600"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
