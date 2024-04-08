import BreadCum from "../breadcum/BreadCum";
import { Card, CardBody, Input, Textarea, Image, Select, SelectItem } from "@nextui-org/react";
import { FaDollarSign, FaWeightHanging, FaWarehouse } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import axios from "axios";
import styles from "./FormRegister.module.css";

// defines the datatypes of the form inputs
interface FData {
    image: any,
    modelo: string,
    descripcion: string,
    proveedor: number,
    clasificacion: number,
    linea: number,
    material: number,
    peso: number,
    precio: number,
    stock_unitario: number,
    stock_gramos: number

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
        /* const {
             image,
             modelo,
             descripcion,
             proveedor,
             clasificacion,
             linea,
             material,
             peso,
             precio,
             stock_gramos,
             stock_unitario
         } = data;
         console.log(modelo);
         //create form data object
         const formData = new FormData();
         formData.append('image', image);
         formData.append('modelo', modelo);
         formData.append('descripcion', descripcion);
         formData.append('proveedor', proveedor.toString());
         formData.append('clasificacion', clasificacion.toString());
         formData.append('linea', linea.toString());
         formData.append('material', material.toString());
         formData.append('peso', peso.toString());
         formData.append('precio', precio.toString());
         formData.append('stock_gramos', stock_gramos.toString());
         formData.append('stock_unitario', stock_unitario.toString());
         console.log('form data:', formData);*/
        //call register function
        registerProduct(data);
    });

    // axios functions
    /**
     * sends the form values to the server to register a new product
     */
    async function registerProduct(data: FData) {
        try {
            //post to server
            const res = await axios.post('/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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
                        {(file) ? <label><strong>Imagen:</strong></label> : null}

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
                            {...register("precio",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="number"
                            min={1}
                            label="Precio(MXN)"
                            placeholder="Ingresa precio.."
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">
                                        <FaDollarSign />
                                    </span>
                                </div>
                            }
                        />
                        {errors.precio && <p className={styles.formError}>{errors.precio.message}</p>}
                        {/**weight input */}
                        <Input
                            {...register("peso",
                                {
                                    required: "* Este campo es requerido."
                                })}
                            className={styles.formInputs}
                            size="sm"
                            type="number"
                            min={1}
                            label="Peso(gr)"
                            placeholder="Ingresa peso en gramos.."
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">
                                        <FaWeightHanging />
                                    </span>
                                </div>
                            }
                        />
                        {errors.peso && <p className={styles.formError}>{errors.peso.message}</p>}
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
                            label="Stock(unidades)"
                            placeholder="Ingresa unidades.."
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">
                                        <FaWarehouse />
                                    </span>
                                </div>
                            }
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