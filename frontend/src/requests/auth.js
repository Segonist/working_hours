export async function authorize(credentials) {
    const newRequest = new Request(`${import.meta.env.VITE_SERVER}/api/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
    });

    await fetch(newRequest)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }

            return responce.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.access_token);
        });
}

export async function newUser(credentials) {
    const newRequest = new Request(`${import.meta.env.SERVER}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
    });

    await fetch(newRequest)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }

            return responce.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.access_token);
        });
}
