import _ from "lodash";
import {RBAC0} from "./index";

export default function hasPermissions(user: RBAC0 | undefined, permissions: string[]): boolean {
    if (!user) return false;
    const userPermissions = user.roles.map(r => r.permissions).flat();
    return _.intersection(permissions, userPermissions).length > 0;
}