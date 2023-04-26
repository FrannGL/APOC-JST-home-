import { Form, FormControl, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
// import users from "../mocks/users";

export default function TableList() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(false);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const usersPromise = new Promise((resolve) =>
  //     setTimeout(() => resolve(users), 1000)
  //   );
  //   usersPromise
  //     .then((res) => {
  //       setData(res);
  //     })
  //     .catch((err) => console.log(err));
  // });

  const toogleMode = () => {
    setMode(!mode);
  };

  return (
    <div>
      <CreateUser />
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
            <th>DNI</th>
            <th>Fecha de Nacimiento</th>
            <th>Baja</th>
            <th>Estado Civil</th>
            <th>Sector</th>
            <th>CUIT</th>
            <th>Hijos</th>
            <th>Categoria</th>
            <th>Mail</th>
            <th>Celular</th>
          </tr>
        </thead>
        <tbody>
          {/* {data
            .filter((row) =>
              search === ""
                ? true
                : row.nombre.includes(search) ||
                  row.apellido.includes(search) ||
                  row.email.includes(search)
            )
            .map((info) => {
              return (
                <tr key={info.id}>
                  <td>{info.id}</td>
                  <td>{info.nombre}</td>
                  <td>{info.apellido}</td>
                  <td>{info.nroAfiliado}</td>
                  <td>{info.dni}</td>
                  <td>{info.nacimiento}</td>
                  <td>{info.baja}</td>
                  <td>{info.estadoCivil}</td>
                  <td>{info.sector}</td>
                  <td>{info.cuit}</td>
                  <td>{info.hijos}</td>
                  <td>{info.categoria}</td>
                  <td>{info.email}</td>
                  <td>{info.celular}</td>
                </tr>
              );
            })} */}
        </tbody>
      </Table>
    </div>
  );
}
