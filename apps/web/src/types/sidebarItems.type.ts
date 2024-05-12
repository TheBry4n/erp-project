import {LucideIcon} from "lucide-react"
import { ReactNode } from "react";

interface LinkObj {
    label: string;
    href: string;
    icon?: LucideIcon;
}

export interface SideBarItems {
    links: {
        user: Array<LinkObj>;
        admin: Array<LinkObj>;
    };
    linksDashboard: {
        admin: Array<LinkObj>;
        manager: Array<LinkObj>;
    };
    accountLinks: {
        loggend: Array<LinkObj>;
        notLogged: Array<LinkObj>;
    };
    extras?: ReactNode;
}