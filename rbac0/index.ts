export interface Role {
    name: string;
    permissions: string[];
}

export interface RBAC0 {
    roles: Role[];
}

export interface RBAC0Account extends RBAC0 {
    id: string;
    isLocked: boolean;
    isSuspended: boolean;
    isBanned: boolean;
    lockedReason?: string;
    suspendedReason?: string;
    bannedReason?: string;
}