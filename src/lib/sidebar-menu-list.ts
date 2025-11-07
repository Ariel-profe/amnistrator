import { IconType } from "react-icons";
import { IoAppsOutline, IoBagOutline, IoConstructOutline, IoDiceOutline, IoGridOutline, IoLayersOutline, IoNewspaperOutline, IoPeopleOutline, IoSettingsOutline, IoTicketOutline } from "react-icons/io5";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  createHref?: string;
  icon: IconType;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getCommonMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Inicio",
      menus: [
        {
          href: "/admin",
          label: "Panel general",
          icon: IoAppsOutline,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Gestión general",
      menus: [
        {
          href: "/admin/companies",
          label: "Empresas",
          icon: IoLayersOutline,
          createHref: "/admin/companies/new"
        },
        {
          href: "/admin/payments",
          label: "Abonos",
          icon: IoTicketOutline
        },
        {
          href: "/admin/servicios",
          label: "Servicios",
          icon: IoConstructOutline
        },
        {
          href: "/admin/users",
          label: "Usuarios",
          icon: IoPeopleOutline
        }
      ]
    },
    {
      groupLabel: "Relevamientos",
      menus: [
        {
          href: "/admin/reports/primitivo",
          label: "Primitivo",
          icon: IoNewspaperOutline
        },
        {
          href: "/admin/reports/buci",
          label: "BUCI",
          icon: IoNewspaperOutline
        },
        {
          href: "/admin/reports/moldes",
          label: "Moldes",
          icon: IoNewspaperOutline
        }
      ]
    },
    {
      groupLabel: "Equipos",
      menus: [
        {
          href: "/admin/equipments",
          label: "Equipos",
          icon: IoDiceOutline,
          createHref: "/admin/equipments/new"
        },
        {
          href: "/admin/categories",
          label: "Categorías",
          icon: IoGridOutline,
          createHref: "/admin/categories/new"
        },
        {
          href: "/admin/offices",
          label: "Oficinas",
          icon: IoBagOutline,
          createHref: "/admin/offices/new"
        }
      ]
    }
  ];
}