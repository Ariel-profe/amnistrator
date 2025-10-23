import { IconType } from "react-icons";
import { IoConstructOutline, IoGridOutline, IoNewspaperOutline, IoSettingsOutline, IoTicketOutline } from "react-icons/io5";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: IconType;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Panel administrativo",
          icon: IoGridOutline,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contenido",
      menus: [       
        {
          href: "",
          label: "Relevamientos",
          icon: IoNewspaperOutline,
          submenus: [
            {
              href: "/admin/productos/auriculares",
              label: "1 - Primitivo"
            },
            {
              href: "/admin/productos/caddys",
              label: "2 - Buci"
            },
            {
              href: "/admin/productos/caddys",
              label: "3 - Moldes"
            },
          ]
        },
        {
          href: "/admin/usuarios",
          label: "Servicios",
          icon: IoConstructOutline
        },
        {
          href: "/admin/usuarios",
          label: "Abonos",
          icon: IoTicketOutline
        },
      ]
    },
    {
      groupLabel: "Configuración",
      menus: [
        {
          href: "/account",
          label: "Cuenta",
          icon: IoSettingsOutline
        }
      ]
    }
  ];
}