"use client";

import Link from 'next/link';
import { IoPencilOutline } from 'react-icons/io5';
import { HandleDeleteButton } from '@/components';
import { ICategory } from '@/interfaces/category.interface';

interface Props {
    categories: ICategory[];
};

export const CategoriesTable = ({ categories }: Props) => {

    return (
        <div className="my-10">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                            #ID
                        </th>
                        <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                            Nombre
                        </th>
                        <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                            Editar
                        </th>
                        <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr
                            key={category.id}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap max-w-[100px]">
                                {category.id}
                            </td>

                            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                {category.name}
                            </td>

                            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                <Link href={`/admin/categories/${category.id}`} className="text-blue-500 hover:underline">
                                    <IoPencilOutline />
                                </Link>
                            </td>

                            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                <HandleDeleteButton id={category.id || ""} model="category" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
