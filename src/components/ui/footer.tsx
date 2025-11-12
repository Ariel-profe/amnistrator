import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black text-gray-900 dark:text-white py-8 px-4 font-inter">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/amnistrator.png"
                            alt="Amnistrator Logo"
                            className="w-12 h-12 rounded-full"
                        />
                        <h3 className="text-3xl font-extrabold">
                            <span className="text-amn">AMN</span>istrator
                        </h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Software de administración de datos para organizar y optimizar tu empresa.
                    </p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">
                        Atajos
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="#"
                                className="md:hover:text-primary transition"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="md:hover:text-primary transition"
                            >
                                Servicios
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="md:hover:text-primary transition"
                            >
                                Abonos
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Recursos
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="#"
                                className="md:hover:text-primary transition"
                            >
                                Soporte
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="md:hover:text-primary transition"
                            >
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="md:hover:text-primary transition"
                            >
                                Política de Privacidad
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Contactanos
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Email: soporte@amn.com.ar
                    </p>
                    <a href='tel:+54 261 562 0388' className="text-gray-600 dark:text-gray-300">
                        Telefono: +54 261 562 0388
                    </a>
                    <p className="text-gray-600 dark:text-gray-300">
                        Mendoza - Argentina
                    </p>
                </div>
            </div>
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
                <p className="mt-1">
                    Creado por <a href="#" className="text-amn hover:underline">AMN Consultora Informática</a>
                </p>
                <p>
                    &copy; {new Date().getFullYear()} Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};
