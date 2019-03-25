import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDate: new Date(),
      currentIndex: null,
      notes: [
        {
          created: '2019-03-23T21:27:40.445Z',
          title: 'Hello',
          desc: 'Hello desc'
        },
        {
          created: '2019-03-24T21:27:40.445Z',
          title: 'Hello 2',
          desc: 'Hello desc'
        },
        {
          created: '2019-03-25T21:27:40.445Z',
          title: 'Hello 3',
          desc: 'Hello desc'
        }
      ]
    }
  }

  render() {
    return <h1>React Bootcamp 2019!</h1>
  }
}

export default App
