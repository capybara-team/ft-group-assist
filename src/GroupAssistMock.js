import GroupAssist from "./GroupAssist";

const courseMock = [
    { id: 1, name: "Física", description: "Trabalho de Física", },
    { id: 2, name: "Matemática", description: "Trabalho de Matemática" },
    { id: 3, name: "Português", description: "Trabalho de Português" },
    { id: 4, name: "Química", description: "Trabalho de Química" },
    { id: 5, name: "Artes", description: "Trabalho de Artes" },
]

const managerMock = [
    { id: 1, name: "Trabalho Física", description: "AvaliaçãoTrabalho de Física", },
    { id: 2, name: "Trabalho Matemática", description: "AvaliaçãoTrabalho de Matemática" },
    { id: 3, name: "Trabalho Português", description: "AvaliaçãoTrabalho de Português" },
    { id: 4, name: "Trabalho Química", description: "AvaliaçãoTrabalho de Química" },
    { id: 5, name: "Trabalho Artes", description: "AvaliaçãoTrabalho de Artes" },
]

const groupsMock = [
    { id: 1, name: "Grupo A", description: "Matéria: Física", },
    { id: 2, name: "Grupo B", description: "Matéria: Matemática" },
    { id: 3, name: "Grupo C", description: "Matéria: Português", joined: true },
    { id: 4, name: "Grupo D", description: "Matéria: Química" },
    { id: 5, name: "Grupo E", description: "Matéria: Artes" },
]

export default class GroupAssistMock extends GroupAssist {

    mockRequest = (data = {}) => new Promise(
        resolve =>
            setTimeout(() => resolve(data), 1000)
    )

    auth = () => this.mockRequest({
        access_token: '223',
        token_type: 'bearer',
        expires_in: 1000 * 60 * 60
    })

    logout = () => this.mockRequest()

    getCourses = () => this.mockRequest(courseMock)
    getCourseManagers = course => this.mockRequest(managerMock)

    /**
     * Group Manager Routes
     */
    addManager = () => this.mockRequest()
    getManager = manager => this.mockRequest(managerMock[0])
    deleteManager = manager => this.mockRequest()
    getManagerGroups = manager => this.mockRequest(groupsMock)

    /**
     * Group Routes
     */
    addGroup = group => this.mockRequest()
    getGroup = group => this.mockRequest(groupsMock[0])
    deleteGroup = group => this.mockRequest()
    joinGroup = group => this.mockRequest()
    leaveGroup = group => this.mockRequest()

}
