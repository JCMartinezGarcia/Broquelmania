import {
    Card,
    CardBody,
    CardFooter,
    Divider,
    Link,
} from "@nextui-org/react";
import { FaMoneyBillAlt } from "react-icons/fa";

const HomeCard = () => {
    return (
        <>
            <Card className="max-w-[400px]">
                <Divider />
                <CardBody>
                    <div className="flex flex-row">
                        <div>
                            <p>$35k</p>
                            <p><strong>Ventas</strong></p>
                            <small>Cantidad Mensual</small>
                        </div>
                        <span className="m-auto w-14 h-14 bg-amber-500 rounded-3xl">
                            <FaMoneyBillAlt className="text-3xl mx-auto my-3.5" />
                        </span>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="https://github.com/nextui-org/nextui"
                    >
                        Ver todas las ventas.
                    </Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default HomeCard;