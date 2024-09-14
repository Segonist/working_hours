const SERVER = import.meta.env.VITE_SERVER;

// return last entry for this user if get 0
export async function getShift(shift_id) {
    const request = new Request(`${SERVER}/api/shift/${shift_id}`, {
        method: "GET",
    });

    let responceData = await fetch(request)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }
            return responce.json();
        })
        .then((data) => {
            return data;
        });

    return responceData;
}

export async function getShifts() {
    // TODO ТЕЖ ПЕРЕРОБИТИ
    const request = new Request(`${SERVER}/api/shifts`, {
        method: "GET",
    });

    let responceData = await fetch(request)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }
            return responce.json();
        })
        .then((data) => {
            return data;
        });

    return responceData;
}

export async function createShift(body) {
    const request = new Request(`${SERVER}/api/shift`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    let responceData = await fetch(request)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }

            return responce.json();
        })
        .then((data) => {
            return data;
        });

    return responceData;
}

export async function updateShift(shift_id, body) {
    const request = new Request(`${SERVER}/api/shift/${shift_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    await fetch(request).then((responce) => {
        if (!responce.ok) {
            throw new Error(`${responce.status} ${responce.statusText}`);
        }
    });
}
