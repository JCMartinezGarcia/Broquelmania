import Nav from "../../../components/navbar/navbar/Nav";
import SideBar from "../../../components/sidebar/SideBar";
import ClientsListTable from "../../../components/clients/ClientsListTable";
import ClientsCreateForm from "../../../components/clients/create/ClientsCreateForm";
import ClientsUpdateForm from "../../../components/clients/update/ClientsUpdateForm";
import styles from "./Clients.module.css";

// interface define the types of props 
interface clientProps {
    view: string;
}

//React component
const Clients: React.FC<clientProps> = ({ view }) => {
    //component to be displayed 
    let displayComponent;

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
            displayComponent = <ClientsUpdateForm />;
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
                
                    {
                        displayComponent
                    }

                </div>


            </div>
        </div >
    );
}

export default Clients;