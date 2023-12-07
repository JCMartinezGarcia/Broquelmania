import styles from "./ClientsCreateForm.module.css";
import { Card, CardBody, Input, Textarea, Checkbox, Button } from "@nextui-org/react";
const ClientsCreateForm = () => {
    return (
        <div>
            <h1 className={styles.title}><strong>Registrar Clientes</strong></h1>
            <Card className={styles.formCard}>
                <CardBody>
                    <form>
                        <Input className={styles.formInputs} size="sm" type="text" label="Nombres" placeholder="Ingresa nombres.." />
                        <Input className={styles.formInputs} size="sm" type="text" label="Apellidos" placeholder="Ingresa apellidos.." />
                        <Input className={styles.formInputs} size="sm" type="email" label="Email" placeholder="Ingresa email.." />
                        <Textarea
                            className={styles.formInputs}
                            label="Dirección"
                            placeholder="Ingresa dirección..."
                        />
                        <Input className={styles.formInputs} size="sm" type="text" label="Telefono Móvil" placeholder="Ingresa telefono.." />
                        <Checkbox size="md">Mayorista</Checkbox>
                        <Button className={styles.registerButton} size="md" color="secondary" >Registrar</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default ClientsCreateForm;