import React, { useEffect, useState } from "react";
import {
    Input,
    Button,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    User,
    // Chip,
    Tooltip,
    //getKeyValue,
    Card, CardBody,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import { FaSearch, FaUserEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ClientsListTable.module.css";


interface Clients {
    id: number,
    nombres: string;
    apellidos: string;
    email: string;
    dirección: string;
    telefono_movil: string;
    tipo_cliente: string;
    actions: string;
    created_at: string;
}

/*
const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};
*/

const columns = [
    { name: "NOMBRE", uid: "nombres" },
    { name: "APELLIDOS", uid: "apellidos" },
    { name: "DIRECCIÓN", uid: "dirección" },
    { name: "TELEFONO MÓVIL", uid: "telefono_movil" },
    { name: "TIPO DE CLIENTE", uid: "tipo_cliente" },
    { name: "ACCIONES", uid: "actions" }
];


const ClientsListTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //states
    const [clients, setClients] = useState<Clients[]>([]);
    const [client, setClient] = useState<Clients>();
    const [modalSize, setModalSize] = useState<"lg" | "md" | "xs" | "sm" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined>("lg");
    const [modalCase, setModalCase] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    // Hooks
    const navigate = useNavigate();
    //funtions axios
    /**
     * get all clients data
     */
    async function getClients() {
        try {
            const { data } = await axios.get('/clients');
            setClients(data);
        } catch (error) {
            console.log(error);
        }
    }
    async function getClientById(id: number) {
        try {
            const { data, status } = await axios.get(`clients/${id}`);
            if (status === 200) {
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //React hook to help manage the lifecycle of the component
    useEffect(() => {
        getClients();
    }, []);
    //FUNCTIONS
    /**
     * sends client id to server to be deleted
     */
    async function deleteClient() {
        try {
            const { data, status } = await axios.delete(`/clients/${client?.id}`);
            if (status === 200) {
                getClients();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Handle Functions
    /**
     * redirects to the register view
     */
    function handleCreateClient() {
        navigate('clients/register');
    }
    /**
     * shows details mmodal 
     * @param id 
     */
    async function handleDetails(id: number) {
        const client = await getClientById(id);
        setModalTitle('Detalles del Cliente');
        setClient(client);
        setModalCase('details');
        onOpen();
    }
    /**
     * redirects to edit view
     * @param id 
     */
    function handleEditClient(id: number) {
        navigate(`clients/edit/${id}`);
    }
    /**
     * Shows delete confirmation modal
     * @param id 
     */
    async function handleDeleteClient(id: number) {
        const client = await getClientById(id);
        setModalTitle('Eliminar Cliente');
        setClient(client);
        setModalSize('md');
        setModalCase('delete');
        onOpen();
    }
    const renderCell = React.useCallback((client: Clients, columnKey: keyof Clients) => {
        const cellValue = client[columnKey];

        switch (columnKey) {
            case "nombres":
                return (

                    <User
                        avatarProps={{ radius: "lg", src: "https://i.pravatar.cc/150?u=a048581f4e29026701d" }}
                        description={client.email}
                        name={cellValue}
                    >
                        {client.email}
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
                                onClick={() => handleDetails(client.id)}
                            >
                                <FaEye />

                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                                onClick={() => { handleEditClient(client.id) }}
                            >
                                <FaUserEdit />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => { handleDeleteClient(client.id) }}
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
                                {
                                    (modalCase === 'details')
                                        ? <div>
                                            <label><strong>Nombre(s):</strong></label>
                                            <p>{client?.nombres}</p>
                                            <label><strong>Apellido(s):</strong></label>
                                            <p>{client?.apellidos}</p>
                                            <label><strong>email:</strong></label>
                                            <p>{client?.email}</p>
                                            <label><strong>Dirección:</strong></label>
                                            <p>{client?.dirección}</p>
                                            <label><strong>Telefono Móvil:</strong></label>
                                            <p>{client?.telefono_movil}</p>
                                            <label><strong>Tipo de Cliente:</strong></label>
                                            <p>{client?.tipo_cliente}</p>
                                            <label><strong>Fecha de Registro:</strong></label>
                                            <p>{client?.created_at}</p>
                                        </div>
                                        : <h1>¿Quieres eliminar el usuario : {client?.nombres}?</h1>
                                }

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {
                                    (modalCase === 'delete')
                                        ?
                                        <Button color="danger" onPress={deleteClient}>
                                            Eliminar
                                        </Button>
                                        : null
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/**module title */}
            <h1 className={styles.title}><strong>Clientes</strong></h1>
            <div className={styles.filtsContainer}>
                <div className={styles.searchInput}>
                    <Input
                        type="email"
                        /* label="Email"*/
                        placeholder="Busqueda de clientes.."
                        labelPlacement="outside"
                        startContent={
                            <FaSearch />
                        }
                    />
                </div>
                <Button className={styles.addButton} size="md" color="secondary" onClick={handleCreateClient}>Agregar</Button>
            </div>
            <Card className={styles.clientstableContainer}>
                <CardBody>
                    {/** searchbar filters and actions */}
                    { /**table clients */}
                    <div >
                        <Table aria-label="Example table with custom cells">
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={clients}>
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Clients)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}

export default ClientsListTable;