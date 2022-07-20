export const Login = (user) => ({
    type: "LOG_IN",
    payload: user,
});

export const Logout = () => ({
    type: "LOG_OUT",
});