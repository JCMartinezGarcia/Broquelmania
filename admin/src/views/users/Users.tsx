import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/navbar/navbar/Nav";
import SideBar from "../../components/sidebar/SideBar";
import BreadCum from "../../components/breadcum/BreadCum";
import {
    Image,
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
import styles from "./Users.module.css";

// Interfaces / Types

interface Users {
    id: number,
    name: string;
    email: string;
    password: string;
    created_at: string;
    actions: string
}

// Table columns to be displayed

const columns = [
    { name: "NOMBRE(S)", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "ACCIONES", uid: "actions" }
];

// Functional component

const Users = () => {
    //States
    const [users, setUsers] = useState<Users[]>([]);
    const [user, setUser] = useState<Users>();
    const [modalSize, setModalSize] = useState<"lg" | "md" | "xs" | "sm" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined>("lg");
    const [modalTitle, setModalTitle] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 2;
    const pages = Math.ceil(users.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return users.slice(start, end);
    }, [page, users]);

    //Hooks

    useEffect(() => {
        getUsers();
    }, []);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    //Functions

    /**
     * Gets the list of users available
     */
    async function getUsers() {
        try {
            const { data, status } = await axios.get("/users");
            if (status === 200) {
                setUsers(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Get user data by id
     * @param id 
     * @returns 
     */
    async function getUser(id: number) {
        try {
            const { data, status } = await axios.get(`users/${id}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Search for the users that match the search parameter
     * @param param 
     * @returns
     */
    async function search(param: string) {
        try {
            const { data, status } = await axios.get(`/users/search/${param}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Deletes an user
     * @param id 
     */
    async function deleteUser(id: number) {
        try {
            const { status } = await axios.delete(`/users/${id}`);
            if (status === 200) {
                swal({
                    title: "¡Registro eliminado!",
                    text: "El registro ha sido eliminado con éxito.",
                    icon: "success"
                }).then(() => {
                    getUsers();
                });


            }
        } catch (error) {
            console.log(error);
        }
    }

    //Handle Funtions

    /**
     * Handles the login in order to search for users
     */
    async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        if (value != '') {
            const foundUsers = await search(value);
            console.log('users:', foundUsers);
            (foundUsers.length === 0)
                ? swal({
                    title: "¡Búsqueda sin resultados!",
                    text: "Intenta de nuevo con otro usuario.",
                    icon: "info",
                })
                : setUsers(foundUsers);
        } else {
            getUsers();
        }
    }
    /**
     * Redirects to the form view to register a new user
     */
    function handleRegister() {
        navigate("/usuarios/registro");
    }
    /**
     * Handles login to show user details
     * @param id 
     */
    async function handleDetails(id: number) {
        const user = await getUser(id);
        setModalTitle('Detalles del usuario');
        setUser(user);
        onOpen();
    }
    /**
     * Redirects to edit suppliers form
     * @param id 
     */
    function handleEdit(id: number) {
        navigate(`/usuarios/editar/${id}`);
    }

    /**
     * Shows confirmation modal to delete user
     * @param id 
     */
    function handleDelete(id: number) {
        swal({
            title: "¿Quieres eliminar este usuario?",
            text: "No podrás recuperar el registro, una vez eliminado.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                //calls function to delete user
                deleteUser(id);
            }

        });
    }

    const renderCell = React.useCallback((user: Users, columnKey: keyof Users) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (

                    <User
                        avatarProps={{ radius: "lg", src: "https://i.pravatar.cc/150?u=a048581f4e29026701d" }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
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
                        <Tooltip content="Detalles">
                            <span
                                className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => handleDetails(user.id)}
                            >
                                <FaEye />

                            </span>
                        </Tooltip>
                        {/**
                        <Tooltip content="Editar">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => { handleEdit(user.id) }}
                            >
                                <FaUserEdit />
                            </span>
                        </Tooltip>
                         * 
                         */}
                        <Tooltip color="danger" content="Eliminar">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => { handleDelete(user.id) }}
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
                                    <p>{user?.name}</p>
                                    <label><strong>Email:</strong></label>
                                    <p>{user?.email}</p>
                                    <label><strong>Fecha de registro:</strong></label>
                                    <p>{user?.created_at}</p>
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
                <div className={styles.usersContainer}>
                    {/**breadcum */}
                    <BreadCum />
                    {/**secction tittle */}
                    <h1 className={styles.sectionTitle}><strong>Usuarios</strong></h1>
                    {/**search and filters */}
                    <div className={styles.filtersContainer}>
                        <div className={styles.searchInput}>
                            <Input
                                type="text"
                                /* label="Email"*/
                                placeholder="Buscar usuarios.."
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
                    <Card className={styles.usersTableContainer}>
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
                                                {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Users)}</TableCell>}
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

export default Users;