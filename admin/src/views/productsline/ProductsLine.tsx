import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import BreadCum from "../../components/breadcum/BreadCum";
import {
    //User,
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
import styles from "./ProductsLine.module.css";

/** interfaces / types */
interface ProductsLine {
    id: number,
    linea_producto: string;
    actions: string;
    created_at: string;
}

/** table columns */
const columns = [
    { name: "LINEA DE PRODUCTO", uid: "linea_producto" },
    { name: "ACCIONES", uid: "actions" }
];

//component
const ProductsLine = () => {
    //states
    const [lines, setLines] = useState<ProductsLine[]>([]);
    const [line, setLine] = useState<ProductsLine>();
    const [modalSize, setModalSize] = useState<"lg" | "md" | "xs" | "sm" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined>("lg");
    const [modalTitle, setModalTitle] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 2;
    const pages = Math.ceil(lines.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return lines.slice(start, end);
    }, [page, lines]);
    //hooks
    useEffect(() => {
        getLines();
    }, []);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    //functions 
    /**
     * gets all lines list
     */
    async function getLines() {
        try {
            const { data, status } = await axios.get("/products-lines");
            if (status === 200) {
                setLines(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * get a line data using the id
     * @param id 
     * @returns 
     */
    async function getLine(id: number) {
        try {
            const { data, status } = await axios.get(`/products-lines/${id}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * search for the lines that match the search param
     * @param searchParam 
     * @returns data 
     */
    async function searchLines(searchParam: string) {
        try {
            const { data, status } = await axios.get(`/products-lines/search/${searchParam}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * handles logic to delete a line
     * @param id 
     */
    async function deleteLine(id: number) {
        try {
            const { status } = await axios.delete(`/products-lines/${id}`);
            if (status === 200) {
                swal({
                    title: "¡Registro eliminado!",
                    text: "El registro ha sido eliminado con éxito.",
                    icon: "success"
                }).then(() => {
                    getLines();
                });


            }
        } catch (error) {
            console.log(error);
        }
    }
    // handle functions 

    /**
     * handles the login in order to performa a line search
     */
    async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        if (value != '') {
            const foundLines = await searchLines(value);
            (foundLines.length === 0)
                ? swal({
                    title: "¡Búsqueda sin resultados!",
                    text: "Intenta de nuevo con otra linea de producto.",
                    icon: "info",
                })
                : setLines(foundLines);
        } else {
            getLines();
        }
    }
    /**
     * redirects to the form view to register a new line
     */
    function handleRegister() {
        navigate("/productos/lineas/registrar");
    }
    /**
     * handles login to show line details
     * @param id 
     */
    async function handleDetails(id: number) {
        const line = await getLine(id);
        setModalTitle('Detalles de linea de producto');
        setLine(line);
        onOpen();
    }
    /**
     * redirects to edit line form
     * @param id 
     */
    function handleEdit(id: number) {
        navigate(`/productos/lineas/editar/${id}`);
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
                deleteLine(id);
            }

        });
    }

    const renderCell = React.useCallback((line: ProductsLine, columnKey: keyof ProductsLine) => {
        const cellValue = line[columnKey];

        switch (columnKey) {
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
                                onClick={() => handleDetails(line.id)}
                            >
                                <FaEye />

                            </span>
                        </Tooltip>
                        <Tooltip content="Editar">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => { handleEdit(line.id) }}
                            >
                                <FaUserEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => { handleDelete(line.id) }}
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
                                    <label><strong>Linea de producto:</strong></label>
                                    <p>{line?.linea_producto}</p>
                                    <label><strong>Fecha de registro:</strong></label>
                                    <p>{line?.created_at}</p>
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
                    <h1 className={styles.sectionTitle}><strong>Lineas de producto</strong></h1>
                    {/**search and filters */}
                    <div className={styles.filtersContainer}>
                        <div className={styles.searchInput}>
                            <Input
                                type="text"
                                /* label="Email"*/
                                placeholder="Buscar linea.."
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
                                                {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof ProductsLine)}</TableCell>}
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

export default ProductsLine;