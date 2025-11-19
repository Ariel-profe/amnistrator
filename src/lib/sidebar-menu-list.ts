import { IconType } from "react-icons";
import { IoAppsOutline, IoBagOutline, IoCodeSlashOutline, IoConstructOutline, IoDiceOutline, IoGridOutline, IoLayersOutline, IoNewspaperOutline, IoPeopleOutline, IoTicketOutline } from "react-icons/io5";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href?: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
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
          href: "/",
          label: "Sitio web",
          icon: IoCodeSlashOutline,
          submenus: []
        },
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
          href: "/admin/payments",
          label: "Abonos",
          icon: IoTicketOutline,
          createHref: "/admin/payments/new"
        },
        {
          href: "/admin/companies",
          label: "Empresas",
          icon: IoLayersOutline,
          createHref: "/admin/companies/new"
        },
        {
          label: "Presupuestos",
          icon: IoLayersOutline,
          createHref: "/admin/budgets/new",
          disabled: true
        },
        {
          label: "Servicios",
          icon: IoConstructOutline,
          createHref: "/admin/services/new",
          disabled: true
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
          href: "/admin/surveys/primitivo",
          label: "Primitivo",
          icon: IoNewspaperOutline
        },
        {
          href: "/admin/surveys/buci",
          label: "BUCI",
          icon: IoNewspaperOutline
        },
        {
          href: "/admin/surveys/moldes",
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