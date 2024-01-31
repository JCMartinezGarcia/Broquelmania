import BreadCum from "../breadcum/BreadCum";
import { Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useEffect } from "react";
import styles from "./FormEdit.module.css";

// defines the datatypes of the form inputs
interface FData {
    nombres: string,
    apellidos: string,
    compañia: string,
    email: string,
    telefono_contacto: string,
    direccion: string,
}

const FormEdit = () => {
    //hooks 
    useEffect(() => {
        if (id) {
            getSupplier(Number(id));
        }
    }, []);
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FData>();

    //functions 

    /**
     * calls update function, is triggered on form submition
     */
    const onSubmit = handleSubmit((data) => {
        updateSupplier(data);
    });

    // axios functions

    /**
     * sends data to the server to update a supplier
     */
    async function updateSupplier(data: FData) {
        try {
            //put data to server to update 
            const res = await axios.put(`/suppliers/${id}`, data);
            //validate if reponse is successfull
            if (res.status === 200) {
                //show success message
                swal({
                    title: "¡Proveedor actualizado!",
                    text: "Se actualizó el proveedor con éxito.",
                    icon: "success"
                }).then((action) => {
                    //redirects to suppliers list table
                    (action) ? navigate('/proveedores/listado') : navigate('/proveedores/listado');
                });

            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * gets supplier info by id
     * @param id 
     */
    async function getSupplier(id: number) {
        try {
            const { data, status } = await axios.get(`/suppliers/${id}`);
            if (status === 200) {
                //sets default form data
                reset(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/**Breadcum component */}
            <BreadCum />
            {/**section title */}
            <h1 className={styles.titleSection}><strong>Actualizar Proveedor</strong></h1>
            {/**form update */}
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
                            value="Actualizar"
                        />
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default FormEdit;