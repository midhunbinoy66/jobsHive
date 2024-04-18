export const environment = {
    production: false,
    baseUrl: import.meta.env.NG_APP_BASE_URL, // ${backendUrl} + /api
    google_client_id:import.meta.env.NG_APP_GOOGLE_CLIENT_ID,
    razorpayPublicKey:import.meta.env.NG_APP_razorpayPublicKey
};
