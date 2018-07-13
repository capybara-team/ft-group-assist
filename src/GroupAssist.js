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

        this.api = axios.create({
            baseURL: url,
            transformResponse: [
                response => response.status(200) ?
                    response.data :
                    response
            ],
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

    /**
     * Generates Authentication
     *
     * @memberof GroupAssist
     */
    auth = ({ email, password }) => this.api
        .post('login', { email, password })
        .then((data) => {
            this.token = data.acess_token
            return data
        })

    /**
     * Removes Authentication
     *
     * @memberof GroupAssist
     */
    logout = () => this.api
        .post('logout')
        .then(data => {
            this.token = null
            return data
        })

    /**
     * Courses Routes
     */
    getCourses = () => this.api.get('courses')
    getCourseManagers = course => this.api.get(`courses/${course}/managers`)

    /**
     * Group Manager Routes
     */
    addManager = data => this.api.post(`managers`, data)
    getManager = manager => this.api.get(`managers/${manager}`)
    deleteManager = manager => this.api.delete(`managers/${manager}`)
    getManagerGroups = manager => this.api.get(`managers/${manager}/groups`)

    /**
     * Group Routes
     */
    addGroup = data => this.api.post(`groups`, data)
    getGroup = group => this.api.get(`groups/${group}`)
    deleteGroup = group => this.api.delete(`groups/${group}`)
    joinGroup = group => this.api.put(`groups/${group}/join`)
    leaveGroup = group => this.api.put(`groups/${group}/leave`)

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
