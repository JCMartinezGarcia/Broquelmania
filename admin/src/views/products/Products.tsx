//react imports
import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
//components imports
import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import BreadCum from "../../components/breadcum/BreadCum";
//ui libraries imports
import {
    //User,
    Tooltip,
    Card, CardBody,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Input, Button,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Pagination,
    Image
} from "@nextui-org/react";
//plugins imports
import swal from "sweetalert";
//icons imports
import { FaSearch, FaUserEdit, FaEye, FaTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";
//css imports
import styles from "./Products.module.css";
import { uid } from "chart.js/helpers";


interface Products {
    id: number,
    imagen: string,
    proveedor: string,
    clasificacion: string,
    linea: string,
    modelo: string,
    material: string,
    peso: number,
    precio: number,
    stock: number,
    gramos: number,
    descripcion: string,
    actions: string
}
// table columns 
const columns = [
    { name: "IMAGEN", uid: "imagen" },
    { name: "MODELO", uid: "modelo" },
    { name: "DESCRIPCIÓN", uid: "descripcion" },
    { name: "PROVEEDOR", uid: "proveedor" },
    { name: "CLASIFICACIÓN", uid: "clasificacion" },
    { name: "PRECIO(MXN)", uid: "precio" },
    { name: "ACCIONES", uid: "actions" },
    //{ name: "LINEA DE PRODUCTO", uid: "linea_producto" },
    //{ name: "ACCIONES", uid: "actions" }
];

//react component
const Products = () => {
    //states
    const [products, setProducts] = useState<Products[]>([]);
    const [product, setProduct] = useState<Products>();
    const [modalSize, setModalSize] = useState<"lg" | "md" | "xs" | "sm" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined>("lg");
    const [modalTitle, setModalTitle] = useState('');
    //pagination and table stuff states
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(products.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return products.slice(start, end);
    }, [page, products]);

    //hooks
    useEffect(() => {
        getProducts();
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    //functions

    /**
     * gets all products
     */
    async function getProducts() {
        try {
            const { data, status } = await axios.get("/products");
            if (status === 200) {
                setProducts(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * get a product by id
     * @param id 
     * @returns 
     */
    async function getProduct(id: number) {
        try {
            const { data, status } = await axios.get(`/products/${id}`);
            console.log(data)
            if (status === 200) {
                return data[0];
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Search for products
     * @param searchParam 
     * @returns
     */
    async function search(searchParam: string) {
        try {
            const { data, status } = await axios.get(`/products/search/${searchParam}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Handles logic to delete a product
     * @param id 
     */
    async function deleteProduct(id: number) {
        try {
            const { status } = await axios.delete(`/products/${id}`);
            if (status === 200) {
                swal({
                    title: "¡Registro eliminado!",
                    text: "El registro ha sido eliminado con éxito.",
                    icon: "success"
                }).then(() => {
                    getProducts();
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle functions 
    /**
     * Handles logic to search for products
     * @param e 
     */
    async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        if (value != '') {
            const products = await search(value);
            console.log(products);
            (products.length === 0)
                ? swal({
                    title: "¡Búsqueda sin resultados!",
                    text: "Intenta de nuevo con otro producto.",
                    icon: "info",
                })
                : setProducts(products);
        } else {
            getProducts();
        }
    }

    /**
     * redirects to the form view to register a product
     */
    function handleRegister() {
        navigate("/productos/registrar");
    }
    /**
     * handles login to show product details
     * @param id 
     */
    async function handleDetails(id: number) {
        const prod = await getProduct(id);
        setModalTitle('Detalles del producto');
        setProduct(prod);
        onOpen();
    }
    /**
     * redirects to edit line form
     * @param id 
     */
    function handleEdit(id: number) {
        navigate(`/productos/editar/${id}`);
    }
    /**
     * Shows confirmation modal to delete a line
     * @param id 
     */
    function handleDelete(id: number) {
        swal({
            title: "¿Quieres eliminar este registro?",
            text: "No podrás recuperar el registro, una vez eliminado.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                //calls function to delete register
                deleteProduct(id);
            }

        });
    }

    const renderCell = React.useCallback((product: Products, columnKey: keyof Products) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "imagen":
                return (
                    <Image
                        isZoomed
                        width={60}
                        alt="Imagen del producto"
                        src={product.imagen}
                        style={{ cursor: "pointer" }}
                    />
                );
            case "precio":
                return "$" + cellValue
            /* case "nombres":
                 return (
 
                     <User
                         avatarProps={{ radius: "lg", src: "https://i.pravatar.cc/150?u=a048581f4e29026701d" }}
                         description={supplier.email}
                         name={cellValue}
                     >
                         {supplier.email}
                     </User>
                 );
            */
            /* case "role":
                 return (
                     <div className="flex flex-col">
                         <p className="text-bold text-sm capitalize">{cellValue}</p>
                         <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                     </div>
                 );
             case "status":
 
                 return (
                     <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                         {cellValue}
                     </Chip>
                 );
            */

            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Detalles">
                            <span
                                className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => handleDetails(product.id)}
                            >
                                <FaEye />

                            </span>
                        </Tooltip>
                        <Tooltip content="Editar">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => { handleEdit(product.id) }}
                            >
                                <FaUserEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => { handleDelete(product.id) }}
                            >
                                <FaTrashAlt />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div>
            {/**modal */}
            <Modal
                size={modalSize}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                            <ModalBody>
                                <div>
                                    <label><strong>Imagen:</strong></label>
                                    <Image
                                        isZoomed
                                        width={100}
                                        height={90}
                                        alt="Imagen del producto"
                                        src={product?.imagen}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <label><strong>Descripción:</strong></label>
                                    <p>{product?.descripcion}</p>
                                    <div className="flex flex-row">
                                        <div className="basis-1/3">
                                            <label><strong>Modelo:</strong></label>
                                            <p>{product?.modelo}</p>
                                        </div>
                                        <div className="basis-1/3">
                                            <label><strong>Proveedor:</strong></label>
                                            <p>{product?.proveedor}</p>
                                        </div>
                                        <div className="basis-1/3">
                                            <label><strong>Clasificación:</strong></label>
                                            <p>{product?.clasificacion}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="basis-1/3">
                                            <label><strong>Linea:</strong></label>
                                            <p>{product?.linea}</p>
                                        </div>
                                        <div className="basis-1/3">
                                            <label><strong>Material:</strong></label>
                                            <p>{product?.material}</p>
                                        </div>
                                        <div className="basis-1/3">
                                            <label><strong>Precio(MXN):</strong></label>
                                            <p>${product?.precio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="basis-1/3">
                                            <label><strong>Peso:</strong></label>
                                            <p>{product?.peso}gr</p>
                                        </div>
                                        <div className="basis-1/3">
                                            <label><strong>Stock(unidades):</strong></label>
                                            <p>{product?.stock}</p>
                                        </div>
                                        <div className="basis-1/3">
                                            <label><strong>Stock Gramos:</strong></label>
                                            <p>{product?.gramos}gr</p>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/**navigation bar */}
            <Nav />
            {/**sidebar */}
            <div className={styles.mainContainer}>
                <SideBar isHomeView={false} />
                <div className={styles.sectionContainer}>
                    {/**breadcum */}
                    <BreadCum />
                    {/**secction tittle */}
                    <h1 className={styles.sectionTitle}><strong>Productos</strong></h1>
                    {/**search and filters */}
                    <div className={styles.filtersContainer}>
                        <div className={styles.searchInput}>
                            <Input
                                type="text"
                                /* label="Email"*/
                                placeholder="Buscar producto.."
                                labelPlacement="outside"
                                startContent={
                                    <FaSearch />
                                }
                                onChange={handleSearch}
                            />
                        </div>
                        <Tooltip content="Registrar" color="default">
                            <Button className={styles.registerButton} size="md" color="secondary" onClick={handleRegister}>
                                <FaPlus />
                            </Button>
                        </Tooltip>
                    </div>
                    {/** list table */}
                    <Card className={styles.tableContainer}>
                        <CardBody>
                            <div >
                                <Table aria-label="Example table with custom cells"
                                    bottomContent={
                                        <div className="flex flex-col gap-5">
                                            <Pagination
                                                total={pages}
                                                color="secondary"
                                                page={page}
                                                onChange={setPage}
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="secondary"
                                                    onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
                                                >
                                                    Previous
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="secondary"
                                                    onPress={() => setPage((prev) => (prev < pages ? prev + 1 : prev))}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    }>
                                    <TableHeader columns={columns}>
                                        {(column) => (
                                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                                {column.name}
                                            </TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody items={items}>
                                        {(item) => (
                                            <TableRow key={item.id}>
                                                {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Products)}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                        </CardBody>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default Products;