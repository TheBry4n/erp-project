import {LucideIcon} from "lucide-react"
import { ReactNode } from "react";

interface LinkObj {
    label: string;
    href: string;
    icon?: LucideIcon;
}

export interface SideBarItems {
    links: Array<LinkObj>;
    accountLinks: {
        loggend: Array<LinkObj>;
        notLogged: Array<LinkObj>;
    };
    extras?: ReactNode;
}