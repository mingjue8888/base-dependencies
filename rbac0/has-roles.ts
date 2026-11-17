import _ from "lodash";
import {RBAC0} from "./index";

export default function hasRoles(user: RBAC0 | undefined, roles: string[]): boolean {
    if (!user) return false;
    const userRoles = user.roles.map(r => r.name);
    return _.intersection(roles, userRoles).length > 0;
}