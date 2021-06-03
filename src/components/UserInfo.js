export class UserInfo {
    constructor(userInfoSelectors) {
        this._name = document.querySelector(userInfoSelectors.nameSelector);
        this._job = document.querySelector(userInfoSelectors.jobSelector);
        this._avatar = document.querySelector(userInfoSelectors.avatarSelector);
    }
    getUserInfo() {
        const userInfo = {
        username: this._name.textContent,
        job: this._job.textContent,
        avatar: this._avatar.src
        }
        return userInfo
    }
    setUserInfo({username, job}) {
        if ({username, job}) {
        this._name.textContent = username;
        this._job.textContent = job;
        }
    }
    setUserAvatar(avatar) {
        if (avatar) {
        this._avatar.src = avatar;
        }
    }
}