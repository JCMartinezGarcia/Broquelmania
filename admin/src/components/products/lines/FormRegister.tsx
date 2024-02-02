import BreadCum from "../../breadcum/BreadCum";
import { Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import styles from "./FormRegister.module.css";

// defines the datatypes of the form inputs
interface FData {
    linea_producto: string,
}

const FormRegister = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FData>();
    const navigate = useNavigate();
    /**
     * called on form submit and passes the data to register new line
     */
    const onSubmit = handleSubmit((data) => {
        registerLine(data);
    });

    // axios functions
    /**
     * sends the inputs values of the form to the server to register a new line
     */
    async function registerLine(data: FData) {
        try {
            //post to server
            const res = await axios.post('/products-lines', data);
            //validate if reponse is successfull
            if (res.status === 200) {
                //show success message
                swal({
                    title: "¡Linea registrada!",
                    text: "Se registró la linea con éxito.",
                    icon: "success"
                }).then((action) => {
                    //redirects to clients list table
                    (action) ? navigate('/productos/lineas/listado') : navigate('/productos/lineas/listado');
                });

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/**Breadcum component */}
            <BreadCum />
            <h1 className={styles.sectionTitle}><strong>Registrar Lineas</strong></h1>
            <Card className={styles.formCard}>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <Input
                            {...register("linea_producto",
                                {
                                    required: "* Este campo es requerido.",
                                    maxLength:
                                    {
                                        value: 15,
                                        message: "Maximo 15 characteres."
                                    }
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="text"
                            label="Linea"
                            placeholder="Ingresa linea de producto.."
                        />
                        {errors.linea_producto && <p className={styles.formError}>{errors.linea_producto.message}</p>}

                        <Input
                            className="mt-4"
                            type="submit"
                            color="secondary"
                            value="Registrar"
                        />
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default FormRegister;