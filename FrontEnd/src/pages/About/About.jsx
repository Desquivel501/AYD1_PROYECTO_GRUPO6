import "./About.css";

export function About() {
  const equipo = [{
    name: "Daniel Acabal",
    carnet: 202004724,
    rol: "Desarrollador",
    gitUser: "DanielAcabal",
  },{
    name: "Derek Esquivel",
    carnet: 202010055,
    rol: "Desarrollador",
    gitUser: "Desquivel501",
  },{
    name: "Jose Montenegro",
    carnet: 202004804,
    rol: "Desarrollador",
    gitUser: "Jose2808",
  },{
    name: "Carlos Quixtan",
    carnet: 201901159,
    rol: "Desarrollador",
    gitUser: "Carlos-Quixtan",
  },];
  return (
    <div className="about">
      <h1>Análisis y Diseño de Sistemas 1 - Grupo 6</h1>
      {equipo.map((value) => <AboutMe key={value.gitUser} {...value} />)}
    </div>
  );
}
function AboutMe({ name, carnet, rol, gitUser }) {
  return (
    <div className="about-me">
      <img src={`https://unavatar.io/github/${gitUser}`} alt={gitUser} />
      <section>
        <h2>{name}</h2>
        <h3>{carnet}</h3>
        <p>{rol}</p>
      </section>
    </div>
  );
}
