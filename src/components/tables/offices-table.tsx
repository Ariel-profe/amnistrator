"use client";

import Link from 'next/link';
import { IoPencilOutline } from 'react-icons/io5';
import { HandleDeleteButton } from '@/components';
import { Office } from '@/generated/prisma';

interface Props {
    offices: Office[];
};

export const OfficesTable = ({ offices }: Props) => {

    return (
        <div className="my-10">
              <table className="min-w-4xl mx-auto">
                <thead className="bg-slate-100 dark:bg-slate-900 border-b ">
                    <tr className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        <th
                            scope="col"
                            className="px-6 py-4 text-left max-w-[100px]"
                        >
                            #ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left"
                        >
                            Nombre
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left"
                        >
                            Editar
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left"
                        >
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {offices.map((office) => (
                        <tr
                            key={office.id}
                            className="bg-slate-100 dark:bg-slate-800 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-sm text-slate-500 dark:text-gray-200 font-bold"
                        >
                            <td className="px-6 py-4 whitespace-nowrap max-w-[100px]">
                                {office.id?.split('-')[0]}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                {office.name}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={`/admin/offices/${office.id}`} className="text-blue-500 hover:underline">
                                    <IoPencilOutline />
                                </Link>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <HandleDeleteButton id={office.id || ""} model="office" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
