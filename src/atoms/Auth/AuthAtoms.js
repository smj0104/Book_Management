import { atom } from "recoil";

export const refreshState = atom({//atom은 전역상태 recoil에서만 atom이라 부름
    key:"refreshState",
    default: true
});

export const authenticatedState = atom({
    key:"authenticatedState",
    default: false
});
