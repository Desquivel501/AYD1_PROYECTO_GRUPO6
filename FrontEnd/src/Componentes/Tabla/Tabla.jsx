export function Tabla({ headers, fields, data, children, categoria }) {
  return (
    <table style={{ marginTop: "10px", borderCollapse: "collapse" }}>
      <thead
        className="sombra"
        style={{
          display: "table",
          width: "calc( 100% - 1em )",
          tableLayout: "fixed",
        }}
      >
        {headers.map((value) => <th>{value}</th>)}
      </thead>
      <tbody
        style={{ display: "block", overflowY: "scroll", height: "55vh" }}
        className="sombra-tr"
      >
        {data.map((value, index) => (
          <tr
            style={{
              display: "table",
              width: "100%",
              tableLayout: "fixed",
            }}
            key={index}
          >
            {fields.map((item) => {
              if (item == categoria?.name) {
                const map = categoria.options[value[item]];
                return (
                  <td style={{ color: map.color }}>
                    {map.txt}
                  </td>
                );
              }
              return <td>{value[item]}</td>;
            })}
            {children}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
