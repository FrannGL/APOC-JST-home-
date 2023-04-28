import { Form, FormControl, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function TableList({ users }) {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(false);

  const toogleMode = () => {
    setMode(!mode);
  };

  let idInc = 1;
  let totalUsers = users.length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Filtrar</Form.Label>
            <Form.Control
              type="email"
              placeholder="Buscar..."
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          </Form.Group>
        </Form>
        <h5>La cantidad de afiliados total es de {totalUsers} </h5>
      </div>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label={mode ? "Dark Mode" : "Light Mode"}
          onClick={toogleMode}
        />
      </Form>
      <Table striped bordered hover size="sm" variant={mode ? "dark" : "light"}>
        <thead>
          <tr>
            <th>#</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Nro de Afiliado</th>
            <th>Fecha de Nacimiento</th>
            <th>DNI</th>
            <th>CUIT</th>
            <th>Estado Civil</th>
            <th>Hijos</th>
            <th>Categoria</th>
            <th>Mail</th>
            <th>Celular</th>
            <th>Sector</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              search === ""
                ? true
                : user.userNombre
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.userApellido
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.userMail.toLowerCase().includes(search.toLowerCase()) ||
                  user.userDni.includes(search)
            )
            .map((user) => {
              return (
                <tr key={user.id}>
                  <td>{idInc++}</td>
                  <td>{user.userApellido}</td>
                  <td>{user.userNombre}</td>
                  <td>{user.userNroAfiliado}</td>
                  <td>{user.userFechaNacimiento}</td>
                  <td>{user.userDni}</td>
                  <td>{user.userCuit}</td>
                  <td>{user.userEstadoCivil}</td>
                  <td>{user.userHijos}</td>
                  <td>{user.userCategoria}</td>
                  <td>{user.userMail}</td>
                  <td>{user.userCelular}</td>
                  <td>{user.userSector}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
