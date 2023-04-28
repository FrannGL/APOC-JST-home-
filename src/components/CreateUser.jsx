import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import TableList from "./TableList";
import Swal from "sweetalert2";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

  useEffect(() => {
    const db = getFirestore();
    const usersCollettion = collection(db, "usuarios");
    getDocs(usersCollettion)
      .then((snapshot) => {
        const docs = snapshot.docs;
        setAllUsers(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      })
      .catch((err) => console.log(err));
  }, [allUsers]);

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

      const user = {
        userApellido: apellido.toUpperCase(),
        userNombre: nombre.toUpperCase(),
        userNroAfiliado: nroAfiliado,
        userFechaNacimiento: fechaNacimiento,
        userDni: dni,
        userCuit: cuit,
        userGenero: genero,
        userEstadoCivil: estadoCivil,
        userHijos: hijos,
        userCategoria: categoria.toUpperCase(),
        userMail: mail,
        userCelular: celular,
        userSector: sector,
      };
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario Agregado Correctamente",
        showConfirmButton: true,
        timer: 1500,
      });
      newUser(user);
      sendResultsToFirestore(user);
    }
    setValidated(true);
  };

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
                  <option value="Divorciado">Divorciado</option>
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
                  <option value="AREA TECNICA OPERATIVA">
                    AREA TECNICA OPERATIVA
                  </option>
                  <option value="AREA DE RELEVAMIENTO TECNICO">
                    AREA DE RELEVAMIENTO TECNICO
                  </option>
                  <option value="COORDINACION DE SISTEMS">
                    COORDINACION DE SISTEMS
                  </option>
                  <option value="COORDINACION FEDERAL">
                    COORDINACION FEDERAL
                  </option>
                  <option value="COORDINACION INSTITUCIONAL">
                    COORDINACION INSTITUCIONAL
                  </option>
                  <option value="DIRECCION DE ADMINISTRACION">
                    DIRECCION DE ADMINISTRACION
                  </option>
                  <option value="DIRECCION DE ASUNTOS JURIDICOS">
                    DIRECCION DE ASUNTOS JURIDICOS
                  </option>
                  <option value="DIRECCION DE CAPACITACION">
                    DIRECCION DE CAPACITACION
                  </option>
                  <option value="DIRECCION DE RECURSOS HUMANOS">
                    DIRECCION DE RECURSOS HUMANOS
                  </option>
                  <option value="GESTION PATRIMONIAL Y SERVICIOS GENERALES">
                    GESTION PATRIMONIAL Y SERVICIOS GENERALES
                  </option>
                  <option value="JEFATURA DE GABINETE">
                    JEFATURA DE GABINETE
                  </option>
                  <option value="PRESIDENCIA">PRESIDENCIA</option>
                  <option value="UNIDAD DE AUDITORIA INTERNA">
                    UNIDAD DE AUDITORIA INTERNA
                  </option>
                  <option value="DIRECCION GENERAL TECNICA, ADMINISTRATIVA Y LEGAL">
                    DIRECCION GENERAL TECNICA, ADMINISTRATIVA Y LEGAL
                  </option>
                  <option value="DIRECCION DE SEGURIDAD MEDIOAMBIENTAL EN EL TRANSPORTE">
                    DIRECCION DE SEGURIDAD MEDIOAMBIENTAL EN EL TRANSPORTE
                  </option>
                  <option value="DIRECCION NACIONAL DE EVALUACION Y MONITOREO ACCIDENTOLOGICO">
                    DIRECCION NACIONAL DE EVALUACION Y MONITOREO ACCIDENTOLOGICO
                  </option>
                  <option value="DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS AERONAUTICOS">
                    DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS AERONAUTICOS
                  </option>
                  <option value="DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS AUTOMOTORES">
                    DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS AUTOMOTORES
                  </option>
                  <option value="DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS MARITIMOS, FLUVIALES Y LACUSTRES">
                    DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS MARITIMOS,
                    FLUVIALES Y LACUSTRES
                  </option>
                  <option value="DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS FERROVIARIOS">
                    DIRECCION NACIONAL DE INVESTIGACION DE SUCESOS FERROVIARIOS
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

        <TableList users={allUsers} />
      </div>
    </>
  );
}
