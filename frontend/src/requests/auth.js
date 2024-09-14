const SERVER = import.meta.env.VITE_SERVER;

export async function authorize(credentials) {
    const newRequest = new Request(`${SERVER}/api/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
    });

    let code;
    const responce = await fetch(newRequest)
        .then((responce) => {
            code = responce.status;
            return responce.json();
        })
        .then((data) => {
            return data;
        });
    return [code, responce];
}

export async function newUser(credentials) {
    const newRequest = new Request(`${SERVER}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
    });

    let code;
    const responce = await fetch(newRequest)
        .then((responce) => {
            code = responce.status;
            return responce.json();
        })
        .then((data) => {
            return data;
        });
    return [code, responce];
}
