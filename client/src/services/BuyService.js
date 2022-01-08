const baseURL = 'http://localhost:5000/api/buys/';

const BuyService = {
    getBuys() {
        return fetch(baseURL)
            .then(res => res.json());
    },

    addBuy(buy) {
        return fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify(buy),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },

    updateBuy(buy) {
        return fetch(baseURL + buy._id, {
            method: 'PUT',
            body: JSON.stringify(buy),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    },

    deleteBuy(id) {
        return fetch(baseURL + id, {
            method: 'DELETE'
        });
    }
};

export default BuyService;