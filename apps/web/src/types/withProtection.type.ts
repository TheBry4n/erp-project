import React from "react";
import { Session } from "./session.type";

export interface withProtectionProps extends React.HTMLAttributes<HTMLDivElement> {
    sessionRequired: boolean;
    accessRole?: Array<string>;
    asPublicRoute?: boolean;
}