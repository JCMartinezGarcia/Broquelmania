import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Card, CardBody,
    Input, Textarea, Checkbox,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import BreadCum from "../../breadcum/BreadCum";
import styles from "./ClientsUpdate.module.css";
//import Clients from "../../../views/clients/list/Clients";

// defines the datatypes of the form inputs
interface FData {
    nombres: string,
    apellidos: string,
    email: string,
    dirección: string,
    telefono_movil: string,
    tipo_cliente: string
}

const ClientsUpdateForm = () => {
    //react-hook-forms
    const { register, handleSubmit, formState: { errors }, control, reset, getValues, setValue } = useForm<FData>();
    //states
    const [isSelected, setIsSelected] = useState(false);
    //hooks
    useEffect(() => {
        if (id) {
            getClientById(Number(id));
        }
    }, []);
    //hook navigate
    const navigate = useNavigate();
    // client id
    const { id } = useParams();
    //axios functions
    async function getClientById(id: number) {
        try {
            const { data, status } = await axios.get(`/clients/${id}`);
            if (status === 200) {
                (data.tipo_cliente === "Mayorista") ? setIsSelected(true) : setIsSelected(false);
                reset(data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * sends the data to be updated to the server
     * @param data 
     */
    async function updateClient(dataClient: FData) {
        try {
            const { status } = await axios.put(`/clients/${id}`, dataClient);
            if (status === 200) {
                swal({
                    title: "¡Cliente actualizado!",
                    text: "El cliente se actualizó con éxito.",
                    icon: "success"
                }).then((prom) => {
                    (prom) ? navigate('/clients') : navigate('/clients');
                });

            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * called on form submit, calls update function
     */
    const onSubmit = handleSubmit((data) => {
        updateClient(data);
    });
    /**
     * changes the state for the type of client checkbox
     * and also the type value of client
     */
    function handleClientType() {
        (isSelected) ? setIsSelected(false) : setIsSelected(true);
        (getValues("tipo_cliente") === "Mayorista") ? setValue("tipo_cliente", "Público") : setValue("tipo_cliente", "Mayorista");
    }

    return (
        <div>
            {/**Breadcum component */}
            <BreadCum />
            <h1 className={styles.title}><strong>Actualizar Cliente</strong></h1>
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
                            render={({ field }) => <Checkbox
                                {...field}
                                isSelected={isSelected}
                                onChange={handleClientType}
                            >
                                Mayorista
                            </Checkbox>}
                        />

                        <Input
                            className="mt-4"
                            type="submit"
                            color="secondary"
                            value="Actualizar"
                        />

                    </form>
                </CardBody>
            </Card>
        </div >
    );
}

export default ClientsUpdateForm;