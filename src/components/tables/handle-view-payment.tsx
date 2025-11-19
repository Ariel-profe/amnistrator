import { IoEyeOutline } from "react-icons/io5";
import { Payment, PaymentItem } from "@/generated/prisma";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, HandleAddUpdatePaymentItem, HandleDeleteButton } from "@/components";
import { format } from "date-fns";

interface Props {
    payment: (
        Payment
        & { month: { name: string } }
        & { paymentItems: PaymentItem[] }
    )
    | null;
};

export const HandleViewPayment = ({ payment }: Props) => {

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="link">
                        <IoEyeOutline className="text-blue-700" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-7xl">
                    <DialogHeader>
                        <DialogTitle className="uppercase">
                            {payment?.month?.name} - {payment?.totalHours} horas
                        </DialogTitle>
                        {
                            !payment || payment?.paymentItems.length === 0
                                ? (
                                    <div className='flex justify-center items-center h-40'>
                                        <p>No hay servicios agregados a este abono</p>
                                    </div>
                                ) : (
                                    <table className="min-w-4xl mx-auto">
                                        <thead className="bg-slate-100 dark:bg-slate-900 border-b ">
                                            <tr className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left"
                                                >
                                                    Fecha
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left"
                                                >
                                                    Servicio
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left"
                                                >
                                                    Hora inicio
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left"
                                                >
                                                    Hora finalización
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left"
                                                >
                                                    Cantidad horas
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-left"
                                                >
                                                    Horas disponibles
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payment?.paymentItems.map((service) => (
                                                <tr
                                                    key={service.id}
                                                    className="bg-slate-100 dark:bg-slate-800 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-sm text-slate-500 dark:text-gray-200 font-bold"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {format(new Date(service.date), 'dd/MM/yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4 w-1/3 max-w-0">
                                                        <div className="truncate">
                                                            {service.description}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {service.startTime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {service.endTime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {service.amountOfHours}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {service.availableHours}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                                        <HandleAddUpdatePaymentItem
                                                            paymentId={payment.id}
                                                            paymentItem={service}
                                                        />
                                                        <HandleDeleteButton id={service.id} model="paymentItem" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                        }

                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cerrar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};