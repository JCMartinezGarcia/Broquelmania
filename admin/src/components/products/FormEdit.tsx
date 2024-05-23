import BreadCum from "../breadcum/BreadCum";
import { Card, CardBody, Input, Textarea, Image, Select, SelectItem, Button } from "@nextui-org/react";
import { FaDollarSign, FaWeightHanging, FaWarehouse, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FormEdit.module.css";

/**
 * Interfaces / Types
 */

// defines the datatypes of the form inputs
interface FData {
    imagen: any,
    modelo: string,
    descripcion: string,
    proveedor: string,
    clasificacion: string,
    linea: string,
    material: string,
    peso: number,
    precio: number,
    stock: number,
    gramos: number

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
interface FormEditProps {
    suppliers: Supliers[];
    classifications: Classifications[];
    lines: Lines[];
    materials: Materials[];
}
type EditProduct = {
    imagen: any;
    modelo: string;
    descripcion: string;
    proveedor: string;
    clasificacion: string;
    linea: string;
    material: string;
    peso: string;
    precio: string;
    stock: string;
    gramos: string;
}
const FormEdit: React.FC<FormEditProps> = (
    {
        suppliers,
        classifications,
        lines,
        materials
    }) => {
    const {
        register
        , handleSubmit
        , formState: { errors }
        , control
        , reset
        , setValue
    } = useForm<FData>();
    //hooks
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getProduct(Number(id));
        }
    }, []);
    const navigate = useNavigate();
    //states
    const [file, setFile] = useState<string | null>(null);
    const [editSupplier, setEditSupplier] = useState<boolean>(false);
    const [editClass, setEditClass] = useState<boolean>(false);
    const [editLine, setEditLine] = useState<boolean>(false);
    const [editMaterial, setEditMaterial] = useState<boolean>(false);
    const [editImagen, setEditImagen] = useState<boolean>(false);

    //Functions

    /**
     * Called on form submit and passes the data to edit a product
     */
    const onSubmit = handleSubmit((data) => {
        const { imagen } = data;
        //validate if file is empty
        if (typeof imagen === 'object') {
            if (imagen.length === 0) {
                //if empty, set file state value to obj property
                data.imagen = file;
            }
        }
        //call edit function
        editProduct(data);
    });

    function setImgOnMount(img: string) {
        setFile(img);
    }

    // Axios functions
    /**
     * sends file to server to be uploaded and returns the url
     * @param file 
     * @param model 
     * @returns 
     */
    async function uploadFile(file: FData, model: String) {
        //create  file object 
        const fileObj = {
            file,
            model
        }
        //make axios request
        try {
            const { data, status } = await axios.post('products/fileupload', fileObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (status == 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * sends the form values to the server to edit an existing product
     * @param data 
     */
    async function editProduct(data: FData) {
        //upload file
        const { imagen, modelo } = data;
        //validate if imagen is file type, if true upload file
        if (typeof imagen == 'object') {
            const fileUrl = await uploadFile(imagen, modelo);
            //set file url value
            data.imagen = fileUrl;
        }
        //make put request 
        try {
            const res = await axios({
                method: 'put',
                url: `/products/${id}`,
                data
            });
            //validate if reponse is successfull
            if (res.status === 200) {
                //show success message
                swal({
                    title: "¡Producto editado!",
                    text: "Se editó el producto exitosamente.",
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
    /**
     * gets the product to be updated
     * @param id 
     */
    async function getProduct(id: number) {
        try {
            const { data, status } = await axios.get(`products/${id}`);
            if (status == 200 && data.length > 0) {
                setImgOnMount(data[0].imagen);
                reset(data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //functions
    /**
     * gets the selected file, creates an URL and uses and state to save it
     * @param e 
     */
    function getFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
        } else {
            //sets edit image state to false, to make edit button appear and hide file input
            setEditImagen(false);
        }
    }
    /**
     * change editSuppliers state 
     */
    function editSuppliers() {
        (editSupplier) ? setEditSupplier(false) : setEditSupplier(true);
    }
    /**
     * changes editClass state
     */
    function editClasses() {
        (editClass) ? setEditClass(false) : setEditClass(true);
    }
    /**
     * changes editLine state
     */
    function editLines() {
        (editLine) ? setEditLine(false) : setEditLine(true);
    }
    /**
     * changes editMaterials state
     */
    function editMaterials() {
        (editMaterial) ? setEditMaterial(false) : setEditMaterial(true);
    }
    /**
     * changes editImage state
     */
    function editImage() {
        (editImagen) ? setEditImagen(false) : setEditImagen(true);
    }
    /**
     * sets the new supplier value to be updated
     * @param e 
     */
    function handleSupplierEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setValue('proveedor', value);
    }
    /**
     * sets the new class value to be updated
     * @param e 
     */
    function handleClassEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setValue('clasificacion', value);
    }
    /**
     * sets the new line value to be updated
     * @param e 
     */
    function handleLineEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setValue('linea', value);
    }
    /**
     * sets the new material value to be updated
     * @param e 
     */
    function handleMaterialEdit(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setValue('material', value);
    }


    return (
        <div>
            {/**Breadcum component */}
            <BreadCum />
            <h1 className={styles.sectionTitle}><strong>Editar Producto</strong></h1>
            <Card className={styles.formCard}>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        {/**file display */}
                        {(file) ? <label><strong>Imagen:</strong></label> : null}
                        <Image
                            loading="lazy"
                            isBlurred
                            width={150}
                            src={(file) ? file : ''}
                            alt="Imagen del producto"
                            className="m-5 ml-auto"
                        />
                        <div className="flex flex-row">
                            <div className="basis-1/2 mr-2">
                                {/**image input */}
                                <Button
                                    className={(!editImagen) ? styles.formInputs : styles.inputHidden}
                                    color="default" endContent={<FaEdit />} onClick={editImage}>
                                    Editar imagen
                                </Button>

                                <Input
                                    {...register("imagen")}
                                    className={(editImagen) ? styles.formInputs : styles.inputHidden}
                                    size="sm"
                                    type="file"
                                    label="Imagen"
                                    placeholder="Selecciona imagen.."
                                    onChange={getFile}
                                />
                                {errors.imagen && <p className={styles.formError}>{errors.imagen.message}</p>}
                            </div>
                            <div className="basis-1/2">
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
                            </div>
                        </div>

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
                        <div className="flex flex-row">
                            <div className="basis-1/2 mr-2">
                                {/**supplier readonly input */}
                                <Input
                                    {...register("proveedor",
                                        {
                                            required: "* Este campo es requerido."
                                        })}
                                    isReadOnly
                                    className={(!editSupplier) ? styles.formInputs : styles.inputHidden}
                                    size="sm"
                                    type="text"
                                    label="Proveedor"
                                    placeholder="Ingresa proveedor..."
                                    endContent={
                                        <FaEdit
                                            role="button"
                                            className="text-default-400 pointer-events-auto flex-shrink-0"
                                            onClick={editSuppliers}
                                        />
                                    }
                                />
                                {/** suppliers select (default hidden)*/}
                                <Select
                                    label="Proveedor"
                                    placeholder="Selecciona proveedor"
                                    className={(editSupplier) ? styles.formInputs : styles.selHide}
                                    onChange={handleSupplierEdit}
                                >
                                    {suppliers?.map((supplier) => (

                                        <SelectItem
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.compañia}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.proveedor && <p className={styles.formError}>{errors.proveedor.message}</p>}
                            </div>
                            <div className="basis-1/2">
                                {/**classification readonly input */}
                                <Input
                                    {...register("clasificacion",
                                        {
                                            required: "* Este campo es requerido."
                                        })}
                                    isReadOnly
                                    className={(!editClass) ? styles.formInputs : styles.inputHidden}
                                    size="sm"
                                    type="text"
                                    label="Clasificación"
                                    placeholder="Ingresa clasificación..."
                                    endContent={
                                        <FaEdit
                                            role="button"
                                            className="text-default-400 pointer-events-auto flex-shrink-0"
                                            onClick={editClasses}
                                        />
                                    }
                                />
                                {/** classification select (default hidden)*/}
                                <Select
                                    label="Clasificación"
                                    placeholder="Selecciona clasificación"
                                    className={(editClass) ? styles.formInputs : styles.selHide}
                                    onChange={handleClassEdit}
                                >
                                    {classifications?.map((classification) => (
                                        <SelectItem key={classification.id} value={classification.id}>
                                            {classification.clasificacion_producto}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.clasificacion && <p className={styles.formError}>{errors.clasificacion.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="basis-1/2 mr-2">
                                {/**line readonly input */}
                                <Input
                                    {...register("linea",
                                        {
                                            required: "* Este campo es requerido."
                                        })}
                                    isReadOnly
                                    className={(!editLine) ? styles.formInputs : styles.inputHidden}
                                    size="sm"
                                    type="text"
                                    label="Linea"
                                    placeholder="Ingresa linea..."
                                    endContent={
                                        <FaEdit
                                            role="button"
                                            className="text-default-400 pointer-events-auto flex-shrink-0"
                                            onClick={editLines}
                                        />
                                    }
                                />
                                {/** lines select (default hidden)*/}
                                <Select

                                    label="Linea"
                                    placeholder="Selecciona linea"
                                    className={(editLine) ? styles.formInputs : styles.selHide}
                                    onChange={handleLineEdit}
                                >
                                    {lines?.map((line) => (
                                        <SelectItem key={line.id} value={line.id}>
                                            {line.linea_producto}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.linea && <p className={styles.formError}>{errors.linea.message}</p>}

                            </div>
                            <div className="basis-1/2">
                                {/**material readonly input */}
                                <Input
                                    {...register("material",
                                        {
                                            required: "* Este campo es requerido."
                                        })}
                                    isReadOnly
                                    className={(!editMaterial) ? styles.formInputs : styles.inputHidden}
                                    size="sm"
                                    type="text"
                                    label="Material"
                                    placeholder="Ingresa Material..."
                                    endContent={
                                        <FaEdit
                                            role="button"
                                            className="text-default-400 pointer-events-auto flex-shrink-0"
                                            onClick={editMaterials}
                                        />
                                    }
                                />
                                <Select
                                    label="Material"
                                    placeholder="Selecciona material"
                                    className={(editMaterial) ? styles.formInputs : styles.selHide}
                                    onChange={handleMaterialEdit}
                                >
                                    {materials?.map((material) => (
                                        <SelectItem key={material.id} value={material.id}>
                                            {material.material}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {errors.material && <p className={styles.formError}>{errors.material.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="basis-1/3 mr-2">
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
                            </div>
                            <div className="basis-1/3 mr-2">
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
                            </div>
                            <div className="basis-1/3">
                                {/**stock input */}
                                <Input
                                    {...register("stock",
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
                                {errors.stock && <p className={styles.formError}>{errors.stock.message}</p>}
                            </div>
                        </div>

                        <Input
                            role="button"
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