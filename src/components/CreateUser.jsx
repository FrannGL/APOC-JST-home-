import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getFirestore, collection, addDoc } from "firebase/firestore";

class Usuario {
  static id = 0;

  constructor(
    apellido,
    nombre,
    nroAfiliado,
    fechaNacimiento,
    dni,
    cuit,
    genero,
    estadoCivil,
    hijos,
    categoria,
    mail,
    celular,
    sector
  ) {
    Usuario.id++;
    this.orden = Usuario.id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.nroAfiliado = nroAfiliado;
    this.fechaNacimiento = fechaNacimiento;
    this.dni = dni;
    this.cuit = cuit;
    this.genero = genero;
    this.estadoCivil = estadoCivil;
    this.hijos = hijos;
    this.categoria = categoria;
    this.mail = mail;
    this.celular = celular;
    this.sector = sector;
  }
}

export default function createUser() {
  const [allUsers, setAllUsers] = useState([]);
  const [validated, setValidated] = useState(false);

  const newUser = (usuario) => {
    setAllUsers([...allUsers, usuario]);
  };

  const sendResultsToFirestore = async (user) => {
    try {
      const db = getFirestore();
      const usersRef = collection(db, "usuarios");
      const docRef = await addDoc(usersRef, user);
      console.log("Usuario creado con ID: ", docRef.id);
    } catch (error) {
      console.error("Error al crear el usuario: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const apellido = document.getElementById("apellido").value;
      const nombre = document.getElementById("nombre").value;
      const nroAfiliado = document.getElementById("afiliado").value;
      const fechaNacimiento = document.getElementById("fechaNacimiento").value;
      const dni = document.getElementById("dni").value;
      const cuit = document.getElementById("cuit").value;
      const genero = document.getElementById("genero").value;
      const estadoCivil = document.getElementById("estadoCivil").value;
      const hijos = document.getElementById("hijos").value;
      const categoria = document.getElementById("categoria").value;
      const mail = document.getElementById("mail").value;
      const celular = document.getElementById("celular").value;
      const sector = document.getElementById("sector").value;

      // const user = new Usuario(
      //   apellido,
      //   nombre,
      //   nroAfiliado,
      //   fechaNacimiento,
      //   dni,
      //   cuit,
      //   genero,
      //   estadoCivil,
      //   hijos,
      //   categoria,
      //   mail,
      //   celular,
      //   sector
      // );
      const user = {
        userApellido: apellido,
        userNombre: nombre,
        userNroAfiliado: nroAfiliado,
        userFechaNacimiento: fechaNacimiento,
        userDni: dni,
        userCuit: cuit,
        userGenero: genero,
        userEstadoCivil: estadoCivil,
        userHijos: hijos,
        userCategoria: categoria,
        userMail: mail,
        userCelular: celular,
        userSector: sector,
      };
      newUser(user);
      sendResultsToFirestore(user);
    }
    setValidated(true);
  };

  // useEffect(() => {
  //   if (validated) {
  //     const myform = document.getElementById("myForm");
  //     myform.reset();
  //     setValidated(false);
  //   }
  // }, [validated]);

  console.log(allUsers);

  return (
    <>
      <div>
        <div className="mb-5">
          <h1>Crear Usuario</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            id="myForm"
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el apellido"
                  id="apellido"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el Apellido.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el nombre"
                  id="nombre"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el Nombre.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Nro. de Afiliado</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el Nro. de Afiliado"
                  id="afiliado"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el Nro. de Afiliado.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Ingrese la fecha de nacimiento"
                  id="fechaNacimiento"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar la fecha de nacimiento.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el DNI"
                  id="dni"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el DNI.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>CUIT</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el CUIT"
                  id="cuit"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el CUIT.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Género</Form.Label>
                <Form.Control
                  defaultValue="Seleccionar..."
                  as="select"
                  required
                  id="genero"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Debes seleccionar el Género.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Estado Civil</Form.Label>
                <Form.Control
                  defaultValue="Seleccionar..."
                  as="select"
                  required
                  id="estadoCivil"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Soltero">Soltero</option>
                  <option value="Casado">Casado</option>
                  <option value="Union Convivencial">Union Convivencial</option>
                  <option value="Otro">Otro</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Debes seleccionar el Género.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Hijos</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese la cantidad de hijos"
                  id="hijos"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar la cantidad de Hijos..
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese la categoria"
                  id="categoria"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar la categoria.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Ingrese el email"
                  id="mail"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el email.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el celular"
                  id="celular"
                />
                <Form.Control.Feedback type="invalid">
                  Debes ingresar el celular.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  required
                  defaultValue="Seleccionar..."
                  as="select"
                  id="sector"
                >
                  <option value="">Seleccionar...</option>
                  <option value="GESTIÓN PATRIMONIAL Y SERVICIOS GENERALES">
                    GESTIÓN PATRIMONIAL Y SERVICIOS GENERALES
                  </option>
                  <option value="COORDINACIÓN DE SISTEMS">
                    COORDINACIÓN DE SISTEMS
                  </option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Debes seleccionar el Sector.
                </Form.Control.Feedback>
                <Form.Control.Feedback>Correcto</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>

        {/* <h2>Lista de Usuarios</h2>
        <ul>
          {allUsers.map((usuario) => (
            <li key={usuario.orden}>
              <p>Orden: {usuario.orden}</p>
              <p>Apellido: {usuario.apellido}</p>
              <p>Nombre: {usuario.nombre}</p>
              <p>Nro. de Afiliado: {usuario.nroAfiliado}</p>
              <p>Fecha de Nacimiento: {usuario.fechaNacimiento}</p>
              <p>DNI: {usuario.dni}</p>
              <p>GÉNERO: {usuario.genero}</p>
              <p>CUIT: {usuario.cuit}</p>
              <p>Estado Civil: {usuario.estadoCivil}</p>
              <p>Hijos: {usuario.hijos}</p>
              <p>Categoría: {usuario.categoria}</p>
              <p>Mail: {usuario.mail}</p>
              <p>Celular: {usuario.celular}</p>
              <p>Sector: {usuario.sector}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
}
