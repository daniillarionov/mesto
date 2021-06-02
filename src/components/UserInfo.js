export class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        const userInfo = {
        username: this._name.textContent,
        job: this._job.textContent
        }
        return userInfo
    }
    setUserInfo({username, job}) {
        this._name.textContent = username;
        this._job.textContent = job;
    }
    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}