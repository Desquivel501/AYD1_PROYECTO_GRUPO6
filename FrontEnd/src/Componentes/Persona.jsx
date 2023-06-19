import "./Persona.css";
export function PersonAttribute({ attribute, value, children }) {
  return (
    <div className="person-attribute">
      <label>{attribute}</label>
      {children ?? (
        <p>
          {value}
        </p>
      )}
    </div>
  );
}
