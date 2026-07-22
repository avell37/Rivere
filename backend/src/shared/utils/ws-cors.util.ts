export const wsCorsOptions = () => ({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
});
