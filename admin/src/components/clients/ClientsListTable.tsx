import React from "react";
import {
    Input,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    getKeyValue,
    Card,
    CardBody
} from "@nextui-org/react";
import { FaSearch, FaUserEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import styles from "./ClientsListTable.module.css";
import { useNavigate } from "react-router-dom";

interface Users {
    id: string,
    name: string;
    email: string;
    avatar: string;
    role: string;
    team: string;
    status: string;
    age: string,
    actions: string

}


const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Technical Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Senior Developer",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: "Community Manager",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "Sales Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        email: "kristen.cooper@example.com",
    },
];



const ClientsListTable = () => {

    // Hooks
    const navigate = useNavigate();
    // Handle Functions
    function handleCreateClient() { 
        navigate('clients/register');
    }

    const renderCell = React.useCallback((user: Users, columnKey: keyof Users) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (

                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
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
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                <FaUserEdit />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                <FaEye />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
                            <TableBody items={users}>
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
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