import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import BreadCum from "../../components/breadcum/BreadCum";
import {
    User,
    Tooltip,
    Card, CardBody,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Input, Button,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Pagination,
} from "@nextui-org/react";
import swal from "sweetalert";
import { FaSearch, FaUserEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import styles from "./Suppliers.module.css";

/** interfaces / types */
interface Suppliers {
    id: number,
    nombres: string;
    apellidos: string;
    compañia: string;
    email: string;
    telefono_contacto: string;
    direccion: string;
    actions: string;
    created_at: string;
}

/** table columns */
const columns = [
    { name: "NOMBRE(S)", uid: "nombres" },
    { name: "APELLIDOS", uid: "apellidos" },
    { name: "COMPAÑIA", uid: "compañia" },
    { name: "EMAIL", uid: "email" },
    { name: "TELEFONO", uid: "telefono_contacto" },
    { name: "DIRECCIÓN", uid: "direccion" },
    { name: "ACCIONES", uid: "actions" }
];
const Suppliers = () => {
    //states
    const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
    const [supplier, setSupplier] = useState<Suppliers>();
    const [modalSize, setModalSize] = useState<"lg" | "md" | "xs" | "sm" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined>("lg");
    const [modalTitle, setModalTitle] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 2;
    const pages = Math.ceil(suppliers.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return suppliers.slice(start, end);
    }, [page, suppliers]);
    //hooks
    useEffect(() => {
        getSuppliers();
    }, []);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    //functions 
    /**
     * gets all suppliers list
     */
    async function getSuppliers() {
        try {
            const { data, status } = await axios.get("/suppliers");
            if (status === 200) {
                setSuppliers(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * get a supplier data using the id
     * @param id 
     * @returns 
     */
    async function getSupplier(id: number) {
        try {
            const { data, status } = await axios.get(`suppliers/${id}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * search for the suppliers that match the search param
     * @param searchParam 
     * @returns data 
     */
    async function searchSuppliers(searchParam: string) {
        try {
            const { data, status } = await axios.get(`/suppliers/search/${searchParam}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteSupplier(id: number) {
        try {
            const { status } = await axios.delete(`/suppliers/${id}`);
            if (status === 200) {
                swal({
                    title: "¡Registro eliminado!",
                    text: "El registro ha sido eliminado con éxito.",
                    icon: "success"
                }).then(() => {
                    getSuppliers();
                });


            }
        } catch (error) {
            console.log(error);
        }
    }
    // handle functions 

    /**
     * handles the login in order to performa a suppliers search
     */
    async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        if (value != '') {
            const foundSuppliers = await searchSuppliers(value);
            (foundSuppliers.length === 0)
                ? swal({
                    title: "¡Búsqueda sin resultados!",
                    text: "Intenta de nuevo con otro nombre, apellido o compañia.",
                    icon: "info",
                })
                : setSuppliers(foundSuppliers);
        } else {
            getSuppliers();
        }
    }
    /**
     * redirects to the form view to register a new supplier
     */
    function handleRegister() {
        navigate("/proveedores/registro");
    }
    /**
     * handles login to show suppliers details
     * @param id 
     */
    async function handleDetails(id: number) {
        const supplier = await getSupplier(id);
        setModalTitle('Detalles del proveedor');
        setSupplier(supplier);
        onOpen();
    }
    /**
     * redirects to edit suppliers form
     * @param id 
     */
    function handleEdit(id: number) {
        navigate(`/proveedores/editar/${id}`);
    }
    /**
     * Shows confirmation modal to delete supplier
     * @param id 
     */
    function handleDelete(id: number) {
        swal({
            title: "¿Quieres eliminar este proveedor?",
            text: "No podrás recuperar el registro, una vez eliminado.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                //calls function to delete supplier
                deleteSupplier(id);
            }

        });
    }

    const renderCell = React.useCallback((supplier: Suppliers, columnKey: keyof Suppliers) => {
        const cellValue = supplier[columnKey];

        switch (columnKey) {
            case "nombres":
                return (

                    <User
                        avatarProps={{ radius: "lg", src: "https://i.pravatar.cc/150?u=a048581f4e29026701d" }}
                        description={supplier.email}
                        name={cellValue}
                    >
                        {supplier.email}
                    </User>
                );
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
                        <Tooltip content="Details">
                            <span
                                className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => handleDetails(supplier.id)}
                            >
                                <FaEye />

                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => { handleEdit(supplier.id) }}
                            >
                                <FaUserEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => { handleDelete(supplier.id) }}
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
                                    <label><strong>Nombre(s):</strong></label>
                                    <p>{supplier?.nombres}</p>
                                    <label><strong>Apellido(s):</strong></label>
                                    <p>{supplier?.apellidos}</p>
                                    <label><strong>Email:</strong></label>
                                    <p>{supplier?.email}</p>
                                    <label><strong>Dirección:</strong></label>
                                    <p>{supplier?.direccion}</p>
                                    <label><strong>Telefono móvil:</strong></label>
                                    <p>{supplier?.telefono_contacto}</p>
                                    <label><strong>Fecha de registro:</strong></label>
                                    <p>{supplier?.created_at}</p>
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
                <div className={styles.suppliersContainer}>
                    {/**breadcum */}
                    <BreadCum />
                    {/**secction tittle */}
                    <h1 className={styles.sectionTitle}><strong>Proveedores</strong></h1>
                    {/**search and filters */}
                    <div className={styles.filtersContainer}>
                        <div className={styles.searchInput}>
                            <Input
                                type="text"
                                /* label="Email"*/
                                placeholder="Buscar proveedores.."
                                labelPlacement="outside"
                                startContent={
                                    <FaSearch />
                                }
                                onChange={handleSearch}
                            />
                        </div>
                        <Button className={styles.registerButton} size="md" color="secondary" onClick={handleRegister}>Agregar</Button>
                    </div>
                    {/** list table */}
                    <Card className={styles.suppliersTableContainer}>
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
                                                {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Suppliers)}</TableCell>}
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

export default Suppliers;