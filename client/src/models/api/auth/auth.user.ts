import { User } from "shared/models";

export interface IAuthState {
    token?: string | null;
    user?: User | null;
}
