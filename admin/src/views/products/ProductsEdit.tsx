import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import FormEdit from "../../components/products/FormEdit";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductsEdit.module.css";

/**Interfaces */
interface Product {
    imagen: any,
    modelo: string,
    descripcion: string,
    proveedor: number,
    clasificacion: number,
    linea: number,
    material: number,
    peso: number,
    precio: number,
    stock: number,
    gramos: number
}
//React component
const ProductsEdit = () => {

    const isHome: boolean = false;
    
    //hooks
    
    useEffect(() => {
            getSuppliers();
            getClassifications();
            getLines();
            getMaterials();
        
    }, []);
    //states
    const [suppliers, setSuppliers] = useState([]);
    const [classifications, setClassifications] = useState([]);
    const [lines, setLines] = useState([]);
    const [materials, setMaterials] = useState([]);

    //axios functions
    
    
    /**
    * gets product
    */
    async function getProduct($id:number) {
        try {
            const { data, status } = await axios.get(`products/${$id}`);
            if (status == 200) {
                setSuppliers(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
    * gets suppliers
    */
    async function getSuppliers() {
        try {
            const { data, status } = await axios.get('suppliers');
            if (status == 200) {
                setSuppliers(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * gets product classifications
     */
    async function getClassifications() {
        try {
            const { data, status } = await axios.get(`products-classification`);
            if (status == 200) {
                setClassifications(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
    * gets product lines
    */
    async function getLines() {
        try {
            const { data, status } = await axios.get(`products-lines`);
            if (status == 200) {
                setLines(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
    * gets product materials
    */
    async function getMaterials() {
        try {
            const { data, status } = await axios.get(`materials`);
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
                <div className={styles.formSectionContainer}>
                    <FormEdit
                        suppliers={suppliers}
                        classifications={classifications}
                        lines={lines}
                        materials={materials}
                    />
                </div>


            </div>
        </div >
    );
}

export default ProductsEdit;