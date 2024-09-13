const host = "http://127.0.0.1:8000";

export async function getShift(shift_id) {
    const request = new Request(`${host}/api/shift/${shift_id}`, {
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
    const request = new Request(`${host}/api/shifts`, {
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
    const request = new Request(`${host}/api/shift`, {
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
    const request = new Request(`${host}/api/shift/${shift_id}`, {
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
