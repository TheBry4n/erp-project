import React from "react";
import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "@web/src/components/ui/button"
import { cn } from "../lib/utils";

interface SideBarButtonProps extends ButtonProps{
    icon?: LucideIcon
}

export function SideBarButton({ icon: Icon, className, children, ...props }: SideBarButtonProps) {


    return(
        <Button variant="ghost" className={cn("gap-2 justify-start", className)} {...props} >
            {Icon && <Icon size={20} />}
            <span>{children}</span>
        </Button>
    )
}