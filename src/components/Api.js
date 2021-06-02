export class Api {
    constructor(options) {
        this._cohort = options.cohort;
        this._token = options.token;
    }
    _request(endpoint, mathod, body) {
        const fetchInit = {
            method: mathod,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/${endpoint}`, body ? {...fetchInit,
            body: JSON.stringify(body)
        } : fetchInit).then(
            (res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.status)
                }
            }))
    }
    getInitialCards() {
        return this._request('cards', 'GET')
    }
    getUserInfo() {
        return this._request('users/me', 'GET')
    }
    uptadeUserInfo(name, job) {
        return this._request('users/me', 'PATCH', {
            name: name,
            about: job
        })
    }
    addCard({
        name,
        link
    }) {
        return this._request('cards', 'POST', {
            name,
            link
        })
    }
    deleteCard(id) {
        return this._request(`cards/${id}`, 'DELETE')
    }
    setLike(id) {
        return this._request(`cards/likes/${id}`, 'PUT')
    }
    removeLike(id) {
        return this._request(`cards/likes/${id}`, 'DELETE')
    }
    editAvatar(avatar) {
        return this._request('users/me/avatar', 'PATCH', {
            avatar: avatar
        })
    }
}