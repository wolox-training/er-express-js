module.exports = {
  User: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Edilberto'
      },
      lastName: {
        type: 'string',
        example: 'Roa'
      },
      email: {
        type: 'string',
        example: 'edilberto.roa@wolox.co'
      },
      password: {
        type: 'string',
        example: ''
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
