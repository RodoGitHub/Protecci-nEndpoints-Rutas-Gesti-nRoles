import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProductContext } from "../../context/ProductContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre es requerido"),

  precio: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor que 0")
    .required("El precio es requerido"),
});


export default function ProductForm() {
  const { products, addProduct, editProduct } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    precio: 0,
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setInitialValues({
          nombre: product.nombre || "",
          precio: product.precio || 0,
        });
      }
    }
  }, [id, products]);

  const handleSubmit = async (values) => {
    if (isEdit) {
      await editProduct(Number(id), values);
    } else {
      await addProduct(values);
    }
    navigate("/productos");
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>{isEdit ? "Editar" : "Crear"} Producto</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          className="p-d-flex p-flex-column p-gap-3"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div>
            <label>Nombre:</label>
            <Field
              name="nombre"
              className="p-inputtext p-component p-mb-3"
              placeholder="Nombre del producto"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Precio:</label>
            <Field
              name="precio"
              type="number"
              className="p-inputtext p-component p-mb-3"
              placeholder="Precio"
            />
            <ErrorMessage
              name="precio"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div className="p-d-flex p-gap-3">
            <Button
              type="submit"
              label={isEdit ? "Actualizar" : "Crear"}
              className="p-button-success p-button-rounded"
            />
            <Button
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => navigate("/productos")}
              type="button"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
