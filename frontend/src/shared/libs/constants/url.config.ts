export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;

export const PUBLIC_URL = {
    root: (url = "") => `${url ? url : ""}`,

    home: () => PUBLIC_URL.root("/"),
    auth: () => PUBLIC_URL.root("/auth"),
    dashboard: () => PUBLIC_URL.root("/dashboard"),
    boards: () => PUBLIC_URL.root("/boards"),
};
