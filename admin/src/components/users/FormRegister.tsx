import BreadCum from "../breadcum/BreadCum";
import { Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import styles from "./FormRegister.module.css";

// Defines the datatypes of the form inputs
interface FData {
    name: string,
    email: string,
    password: string
}

const FormRegister = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FData>();
    const navigate = useNavigate();
    /**
     * is called on form submit and passes the form inputs data to createClient
     */
    const onSubmit = handleSubmit((data) => {
        registerSupplier(data);
    });

    // axios functions
    /**
     * sends the inputs values of the form to the server to create a new client
     */
    async function registerSupplier(data: FData) {
        try {
            //post to server
            const res = await axios.post('/suppliers', data);
            //validate if reponse is successfull
            if (res.status === 200) {
                //show success message
                swal({
                    title: "¡Proveedor registrado!",
                    text: "Se registró el proveedor con éxito.",
                    icon: "success"
                }).then((action) => {
                    //redirects to clients list table
                    (action) ? navigate('/proveedores/listado') : navigate('/proveedores/listado');
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
            <h1 className={styles.title}><strong>Registrar Usuario</strong></h1>
            <Card className={styles.formCard}>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <Input
                            {...register("nombres",
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
                            label="Nombres"
                            placeholder="Ingresa nombre(s).."
                        />
                        {errors.nombres && <p className={styles.formError}>{errors.nombres.message}</p>}
                        <Input
                            {...register("apellidos",
                                {
                                    required: "* Este campo es requerido.",
                                    maxLength:
                                    {
                                        value: 15,
                                        message: "Maximo 15 characteres."
                                    }
                                })}
                            className={styles.formInputs}
                            size="sm" type="text"
                            label="Apellidos"
                            placeholder="Ingresa apellido(s).."
                        />
                        {errors.apellidos && <p className={styles.formError}>{errors.apellidos.message}</p>}
                        <Input
                            {...register("compañia",
                                {
                                    required: "* Este campo es requerido.",
                                    maxLength:
                                    {
                                        value: 15,
                                        message: "Maximo 15 characteres."
                                    }
                                })}
                            className={styles.formInputs}
                            size="sm" type="text"
                            label="Compañia"
                            placeholder="Ingresa compañia.."
                        />
                        {errors.compañia && <p className={styles.formError}>{errors.compañia.message}</p>}
                        <Input
                            {...register("email", { required: "* Este campo es requerido." })}
                            className={styles.formInputs}
                            size="sm"
                            type="email"
                            label="Email"
                            placeholder="Ingresa email.."
                        />
                        {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
                        <Textarea
                            {...register("direccion", { required: "* Este campo es requerido." })}
                            className={styles.formInputs}
                            label="Dirección"
                            placeholder="Ingresa dirección..."
                        />
                        {errors.direccion && <p className={styles.formError}>{errors.direccion.message}</p>}
                        <Input
                            {...register("telefono_contacto", {
                                required: "* Este campo es requerido.",
                                maxLength: {
                                    value: 10,
                                    message: "Maximo 10 digitos."
                                }
                            })}
                            className={styles.formInputs}
                            size="sm"
                            type="text"
                            label="Telefono Móvil"
                            placeholder="Ingresa telefono.."
                        />
                        {errors.telefono_contacto && <p className={styles.formError}>{errors.telefono_contacto.message}</p>}


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