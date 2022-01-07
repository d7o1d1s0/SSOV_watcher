const baseURL = 'http://localhost:5000/api/buys/'

export const getBuys = () => {
    return fetch(baseURL)
        .then(res => res.json())
}

export const postBuy = (payload) => {
    return fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}

export const deleteBuy = (id) => {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}

