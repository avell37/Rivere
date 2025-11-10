export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export const API_URL = {
    root: (url = "") => `${url ? url : ""}`,

    auth: (url = "") => API_URL.root(`/account/${url}`),
    account: (url = "") => API_URL.root(`/account/${url}`),
    session: (url = "") => API_URL.root(`/session/${url}`),
};
