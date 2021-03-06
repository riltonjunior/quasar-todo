export default function () {
  return {
    running: false,
    tasks: [
      {
        title: 'Fazer as compras',
        done: false,
        createdAt: 1590953027638,
        timeStarted: '',
        timeStopped: '',
        timeDuration: 0,
        description: '',
        categories: [{
          id: '03',
          title: 'Casa',
          color: 'teal'
        }],
        running: false
      },
      {
        title: 'Atualizar currículos',
        done: true,
        createdAt: 1590953072486,
        timeStarted: 1590966264096,
        timeStopped: 1590966276274,
        timeDuration: 12178,
        description: '',
        categories: [{
          id: '01',
          title: 'Trabalho',
          color: 'purple'
        },
        {
          id: '02',
          title: 'Estudo',
          color: 'green'
        }],
        running: false
      },
      {
        title: 'Estudar Vue.js',
        done: false,
        createdAt: 1590953092493,
        timeStarted: '',
        timeStopped: '',
        timeDuration: 0,
        description: '',
        categories: [{
          id: '02',
          title: 'Estudo'
        }],
        running: false
      }
    ]
  }
}
