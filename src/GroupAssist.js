import axios from 'axios'

/**
 * Group Assist Service SDK
 *
 * All methods return Promises
 * 
 * @class GroupAssist
 */
export default class GroupAssist {
    /**
     * Creates an instance of GroupAssist.
     * @param {Object} { url, token = null }
     * @memberof GroupAssist
     */
    constructor({ url, token = null }) {
        if (!url)
            throw new Error("No url")

        // Fix url
        if (!url.endsWith('/'))
            url += '/'

        this.api = window.api = axios.create({
            baseURL: url,
        })
        this.token = token
    }

    /**
     * Global instance
     *
     * @static 
     * @memberof GroupAssist
     */
    static instance = null

    /**
     * Generates an instance
     *
     * @static
     * @param {Object} props settings
     * @returns {GroupAssist} instance 
     * @memberof GroupAssist
     */
    static init(props) {
        return this.instance || (this.instance = new this(props))
    }

    extractData = ({ data }) => data

    /**
     * Generates Authentication
     *
     * @memberof GroupAssist
     */
    auth = ({ email, password }) => this.api({
        method: 'POST',
        data: { email, password },
        url: 'login'
    })
        .then(this.extractData)
        .then((data) => {
            this.token = data.access_token
            return data
        })


    getUser = () => this.api.get('user').then(this.extractData)

    /**
     * Removes Authentication
     *
     * @memberof GroupAssist
     */
    logout = () => this.api
        .post('logout')
        .then(this.extractData)
        .then(data => {
            this.token = null
            return data
        })

    /**
     * Courses Routes
     */
    getCourses = () => this.api.get('courses').then(this.extractData)
    getCourseManagers = course => this.api.get(`courses/${course}/managers`).then(this.extractData)

    /**
     * Group Manager Routes
     */
    addManager = data => this.api.post(`managers`, data).then(this.extractData)
    getManager = manager => this.api.get(`managers/${manager}`).then(this.extractData)
    deleteManager = manager => this.api.delete(`managers/${manager}`).then(this.extractData)
    getManagerGroups = manager => this.api.get(`managers/${manager}/groups`).then(this.extractData)

    /**
     * Group Routes
     */
    addGroup = data => this.api.post(`groups`, data).then(this.extractData)
    getGroup = group => this.api.get(`groups/${group}`).then(this.extractData)
    deleteGroup = group => this.api.delete(`groups/${group}`).then(this.extractData)
    joinGroup = group => this.api.put(`groups/${group}/join`).then(this.extractData)
    leaveGroup = group => this.api.put(`groups/${group}/leave`).then(this.extractData)

    /**
     * Update Auth Token
     *
     * @memberof GroupAssist
     */
    set token(token) {
        token ?
            this.api.defaults.headers.common['Authorization'] = 'Bearer ' + token :
            delete this.api.defaults.headers.common['Authorization']
    }
}
