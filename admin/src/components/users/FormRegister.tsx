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

    const { register, handleSubmit, formState: { errors }, control, getValues, setValue } = useForm<FData>();
    const navigate = useNavigate();

    // hadles submit form
    const onSubmit = handleSubmit((data) => {
        setValue('password', '12345678');
        //calling register user method
        registerUser(data);
    });

    // axios functions

    /**
     * Sends data to server to register new users
     * @param data 
     */
    async function registerUser(data: FData) {
        const userInfo = getValues();
        try {
            const res = await axios.post('/users', userInfo);
            //validate if reponse is successfull
            if (res.status === 200) {
                console.log(res);
                return;
                //show success message
                swal({
                    title: "¡Usuario registrado!",
                    text: "Se registró el usuario con éxito.",
                    icon: "success"
                }).then((action) => {
                    //redirects to users list table
                    (action) ? navigate('/usuarios') : navigate('/usuarios');
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
                            {...register("name",
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
                            label="Nombre"
                            placeholder="Ingresa nombre(s).."
                        />
                        {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
                        <Input
                            {...register("email",
                                {
                                    required: "* Este campo es requerido.",
                                    maxLength:
                                    {
                                        value: 30,
                                        message: "Maximo 30 characteres."
                                    }
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="text"
                            label="Email"
                            placeholder="Ingresa email.."
                        />
                        {errors.email && <p className={styles.formError}>{errors.email.message}</p>}

                        <Input
                            className="mt-4"
                            type="submit"
                            role="button"
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