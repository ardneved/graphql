const Project = require('../models/Project.js')
const Client = require('../models/Client.js')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} = require('graphql')

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLID },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // fetch all projects
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
            }
        },
        // fetch a project
        project: {
            type: ProjectType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        },
        // fetch all clients
        clients: {
            type: GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        // fetch a client
        client: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        }
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add a client
        addClient: {
            type: ClientType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                })
                return client.save();
            }
        },
        // update a project
        updateClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
 
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(
                    args.id, {
                    $set: {
                        name: args.name,
                        email: args.email,
                        phone: args.phone,
                    }
                },
                    { new: true }
                )
            }
        },
        // delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id)
            }
        },
        // add a project
        addProject: {
            type: ProjectType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: GraphQLNonNull(GraphQLString)
                },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save();
            }
        },
        // delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id)
            }
        },
        // update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    })
                },
                clientId: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        clientId: args.clientId
                    }
                },
                    { new: true }
                )
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
