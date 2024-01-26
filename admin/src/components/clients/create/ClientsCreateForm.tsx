import { Card, CardBody, Input, Textarea, Checkbox, Button } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import BreadCum from "../../breadcum/BreadCum";
import styles from "./ClientsCreateForm.module.css";

// defines the datatypes of the form inputs
interface FData {
    nombres: string,
    apellidos: string,
    email: string,
    dirección: string,
    telefono_movil: string,
    tipo_cliente: string
}

const ClientsCreateForm = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<FData>();
    const navigate = useNavigate();
    /**
     * is called on form submit and passes the form inputs data to createClient
     */
    const onSubmit = handleSubmit((data) => {
        createClient(data);
    });

    // axios functions
    /**
     * sends the inputs values of the form to the server to create a new client
     */
    async function createClient(data: FData) {
        try {
            //post to server
            const res = await axios.post('/clients', data);
            //validate if reponse is successfull
            if (res.status === 200) {
                //show success message
                swal({
                    title: "¡Cliente registrado!",
                    text: "Se registró el cliente con éxito.",
                    icon: "success"
                }).then((action) => {
                    //redirects to clients list table
                    (action) ? navigate('/clients') : navigate('/clients');
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
            <h1 className={styles.title}><strong>Registrar Clientes</strong></h1>
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
                            placeholder="Ingresa nombres.."
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
                            placeholder="Ingresa apellidos.."
                        />
                        {errors.apellidos && <p className={styles.formError}>{errors.apellidos.message}</p>}
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
                            {...register("dirección", { required: "* Este campo es requerido." })}
                            className={styles.formInputs}
                            label="Dirección"
                            placeholder="Ingresa dirección..."
                        />
                        {errors.dirección && <p className={styles.formError}>{errors.dirección.message}</p>}
                        <Input
                            {...register("telefono_movil", {
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
                        {errors.telefono_movil && <p className={styles.formError}>{errors.telefono_movil.message}</p>}
                        <Controller
                            name="tipo_cliente"
                            control={control}
                            render={({ field }) => <Checkbox {...field}>Mayorista</Checkbox>}
                        />

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

export default ClientsCreateForm;