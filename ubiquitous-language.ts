import RBAC0 from "./rbac0";

export const oneSecond = 1000;
export const oneMinute = oneSecond * 60;
export const oneHour = oneMinute * 60;
export const oneDay = oneHour * 24;
export const oneWeek = oneDay * 7;
export const oneMonth = oneDay * 30;

export interface AbstractAccount extends RBAC0 {
    id: string;
    isLocked: boolean;
    isSuspended: boolean;
    isBanned: boolean;
    lockedReason?: string;
    suspendedReason?: string;
    bannedReason?: string;
}