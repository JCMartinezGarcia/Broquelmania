import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import FormRegister from "../../components/products/FormRegister";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductsRegister.module.css";

// Define la interfaz para los proveedores
interface Supplier {
    id: number;
    nombres: string;
    apellidos: string;
    compañia: string;
    email: string;
    telefono_contacto: string;
    direccion: string;
}
// Define la interfaz para los proveedores
interface Clasifications {
    id: number;
    clasificacion_producto: string;
}
//React component
const ProductsRegister = () => {
    const isHome: boolean = false;
    //hooks
    useEffect(() => {
        getSuppliers();
        getClassifications();
        getLines();
        getMaterials();
    }, []);
    //states
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [classifications, setClassifications] = useState<Clasifications[]>([]);
    const [lines, setLines] = useState([]);
    const [materials, setMaterials] = useState([]);
    //axios functions
    /**
     * get suppliers
     */
    async function getSuppliers() {
        try {
            const { data, status } = await axios.get('suppliers');
            if (status == 200) {
                setSuppliers(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * get classifications
     */
    async function getClassifications() {
        try {
            const { data, status } = await axios.get('products-classification');
            if (status == 200) {
                setClassifications(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * get product lines
     */
    async function getLines() {
        try {
            const { data, status } = await axios.get('products-lines');
            if (status == 200) {
                setLines(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
    * get product materials
    */
    async function getMaterials() {
        try {
            const { data, status } = await axios.get('materials');
            if (status == 200) {
                setMaterials(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Nav />
            <div className={styles.mainContainer}>
                {/**sidebar */}
                <SideBar isHomeView={isHome} />
                {/**clients section */}
                <div className={styles.sectionContainer}>
                    <FormRegister
                        suppliers={suppliers}
                        classifications={classifications}
                        lines={lines}
                        materials={materials} />
                </div>


            </div>
        </div >
    );
}

export default ProductsRegister;