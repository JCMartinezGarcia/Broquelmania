import BreadCum from "../breadcum/BreadCum";
import { Card, CardBody, Input, Textarea, Image, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import styles from "./FormRegister.module.css";
import { useState } from "react";

// defines the datatypes of the form inputs
interface FData {
    image: string
    modelo: string,
    descripcion: string,
    proveedor: number,
    clasificacion: number,
    linea: number,
    material: number,
    peso_unitario: number,
    precio_unitario: number,
    stock_unitario: number,

}
//defynes types of suppliers data
interface Supliers {
    id: number,
    nombres: string,
    apellidos: string,
    compañia: string,
    email: string,
    telefono_contacto: string,
    direccion: string,
}
//defynes types of classification data
interface Classifications {
    id: number,
    clasificacion_producto: string,
}
//defynes types of lines data
interface Lines {
    id: number,
    linea_producto: string,
}
//defynes types of materials data
interface Materials {
    id: number,
    material: string,
}
// Define the type of form props
interface FormRegisterProps {
    suppliers: Supliers[];
    classifications: Classifications[];
    lines: Lines[];
    materials: Materials[];
}
const FormRegister: React.FC<FormRegisterProps> = (
    {
        suppliers,
        classifications,
        lines,
        materials
    }) => {
    //hooks
    const { register, handleSubmit, formState: { errors }, control } = useForm<FData>();
    const navigate = useNavigate();
    //states
    const [file, setFile] = useState<string | null>(null);
    /**
     * called on form submit and passes the data to register new line
     */
    const onSubmit = handleSubmit((data) => {
        registerProduct(data);
    });

    // axios functions
    /**
     * sends the form values to the server to register a new product
     */
    async function registerProduct(data: FData) {
        try {
            //post to server
            const res = await axios.post('/products', data);
            //validate if reponse is successfull
            if (res.status === 200) {
                console.log('returned data:', res.data);
                //show success message
                swal({
                    title: "Producto registrado!",
                    text: "Se registró el producto con éxito.",
                    icon: "success"
                }).then((action) => {
                    //redirects to clients list table
                    (action) ? navigate('/productos/listado') : navigate('/productos/listado');
                });

            }
        } catch (error) {
            console.log(error);
        }
    }


    //functions
    function getFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        } else {
            setFile(null);
        }
    }
    return (
        <div>
            {/**Breadcum component */}
            <BreadCum />
            <h1 className={styles.sectionTitle}><strong>Registrar Producto</strong></h1>
            <Card className={styles.formCard}>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        {/**file display */}
                        <Image
                            loading="lazy"
                            isBlurred
                            width={200}
                            src={(file) ? file : ''}
                            alt="Iamgen del producto"
                            className="m-5 ml-auto"
                        />
                        {/**image input */}
                        <Input
                            {...register("image",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="file"
                            label="Imagen"
                            placeholder="Selecciona imagen.."
                            onChange={getFile}
                        />

                        {errors.image && <p className={styles.formError}>{errors.image.message}</p>}
                        {/**model input */}
                        <Input
                            {...register("modelo",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="text"
                            label="Modelo"
                            placeholder="Ingresa modelo.."
                        />
                        {errors.modelo && <p className={styles.formError}>{errors.modelo.message}</p>}

                        {/**descripcion input */}
                        <Textarea
                            {...register("descripcion",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            label="Descripción"
                            placeholder="Ingresa descripción"
                        />
                        {errors.descripcion && <p className={styles.formError}>{errors.descripcion.message}</p>}
                        {/** suppliers select */}
                        <Select
                            {...register("proveedor",
                                { required: "* Este campo es requerido" })}
                            label="Proveedor"
                            placeholder="Selecciona proveedor"
                            className={styles.formInputs}
                        >
                            {suppliers?.map((supplier) => (
                                <SelectItem key={supplier.id} value={supplier.id}>
                                    {supplier.compañia}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors.proveedor && <p className={styles.formError}>{errors.proveedor.message}</p>}
                        {/** classification select */}
                        <Select
                            {...register("clasificacion",
                                { required: "* Este campo es requerido" })}
                            label="Clasificación"
                            placeholder="Selecciona clasificación"
                            className={styles.formInputs}
                        >
                            {classifications?.map((classification) => (
                                <SelectItem key={classification.id} value={classification.id}>
                                    {classification.clasificacion_producto}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors.clasificacion && <p className={styles.formError}>{errors.clasificacion.message}</p>}
                        {/** lines select */}
                        <Select
                            {...register("linea",
                                { required: "* Este campo es requerido" })}
                            label="Linea"
                            placeholder="Selecciona linea"
                            className={styles.formInputs}
                        >
                            {lines?.map((line) => (
                                <SelectItem key={line.id} value={line.id}>
                                    {line.linea_producto}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors.linea && <p className={styles.formError}>{errors.linea.message}</p>}
                        <Select
                            {...register("material",
                                { required: "* Este campo es requerido" })}
                            label="Material"
                            placeholder="Selecciona material"
                            className={styles.formInputs}
                        >
                            {materials?.map((material) => (
                                <SelectItem key={material.id} value={material.id}>
                                    {material.material}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors.material && <p className={styles.formError}>{errors.material.message}</p>}
                        {/**price input */}
                        <Input
                            {...register("precio_unitario",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="number"
                            min={1}
                            label="Precio"
                            placeholder="Ingresa precio.."
                        />
                        {errors.precio_unitario && <p className={styles.formError}>{errors.precio_unitario.message}</p>}
                        {/**weight input */}
                        <Input
                            {...register("peso_unitario",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="number"
                            min={1}
                            label="Peso"
                            placeholder="Ingresa peso.."
                        />
                        {errors.peso_unitario && <p className={styles.formError}>{errors.peso_unitario.message}</p>}
                        {/**stock input */}
                        <Input
                            {...register("stock_unitario",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="number"
                            min={1}
                            label="Stock"
                            placeholder="Ingresa stock.."
                        />
                        {errors.stock_unitario && <p className={styles.formError}>{errors.stock_unitario.message}</p>}

                        <Input
                            role="button"
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