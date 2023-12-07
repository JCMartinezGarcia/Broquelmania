import BreadCum from "../../../components/breadcum/BreadCum";
import Nav from "../../../components/navbar/navbar/Nav";
import SideBar from "../../../components/sidebar/SideBar";
import ClientsListTable from "../../../components/clients/ClientsListTable";
import ClientsCreateForm from "../../../components/clients/create/ClientsCreateForm";
import styles from "./Clients.module.css";

// interface define the types of props 
interface clientProps {
    view: string;
}

//React component
const Clients: React.FC<clientProps> = ({ view }) => {
    //component to be displayed 
    let displayComponent;
    //this defines the heriarchy of current view
    const breadcumHierarchy: string[] = ['Home', 'Dashboard'];
    const isHome: boolean = false;
    //some logic
    switch (view) {
        case "list":
            displayComponent = <ClientsListTable />;
            break;
        case "create":
            displayComponent = <ClientsCreateForm />;
            break;
        case "update":
            displayComponent = <ClientsListTable />;
            break;
        case "details":
            displayComponent = <ClientsListTable />;
            break;

        default:
            break;
    }

    return (
        <div>
            <Nav />
            <div className={styles.mainContainer}>
                {/**sidebar */}
                <SideBar isHomeView={isHome} />
                {/**clients section */}
                <div className={styles.clientsContainer}>
                    {/**breadcum */}
                    <BreadCum herarchy={breadcumHierarchy} />
                    {
                        displayComponent
                    }

                </div>


            </div>
        </div >
    );
}

export default Clients;