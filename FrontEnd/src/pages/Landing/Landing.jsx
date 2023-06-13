import { Link } from "wouter";
import "./Landing.css";
export function Landing() {
  return (
    <>
      <main>
        <section className="welcome-text">
          <h1>
            Lo que necesites, en la puerta de tu casa
          </h1>
          <p>
            ¡Bienvenido a AlChilazo, la mejor opción para satisfacer tus antojos
            y necesidades en la comodidad de tu hogar!
          </p>
          <p>
            En AlChilazo trabajamos de la mano con los mejores restaurantes de
            la ciudad para bridarte una amplia selección de opciones
            gastronómicas.
          </p>
        </section>
        <img src="./src/assets/login_image.png" alt="Hero image" />
      </main>
      <section className="cualidades">
        <TextCard
          className={"hola"}
          title={"Rapidez"}
          icon={"./src/assets/icons/moto.png"}
        >
          Te aseguramos que tu pedido estará a tiempo y sin demora.
        </TextCard>
        <TextCard
          className={"hola"}
          title={"Diversidad"}
          icon={"./src/assets/icons/porcion-de-pizza.png"}
        >
          Ponemos a tu disposición una gran variedad de restaurantes y
          comercios.
        </TextCard>
        <TextCard
          className={"hola"}
          title={"Confiabilidad"}
          icon={"./src/assets/icons/bloqueado.png"}
        >
          Cuando ordenas con nosotros puedes estar seguro de que tu pedido
          llegará intacto.
        </TextCard>
      </section>
      <footer>
        <ul>
          <li>Quiénes somos</li>
          <li><Link href="/About">Equipo</Link></li>
          <li>Preguntas frecuentes</li>
          <li>Terminos y condiciones</li>
          <li>Políticas de Privacidad</li>
        </ul>
      </footer>
    </>
  );
}
function TextCard({ className, title, children, icon }) {
  return (
    <div className={className}>
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {title}
        <img src={icon} height={"40px"} />
      </h3>
      <p>{children}</p>
    </div>
  );
}
