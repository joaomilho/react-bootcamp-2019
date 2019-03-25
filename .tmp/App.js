import React, { Component } from 'react'
import './styles.css'
import { set, lensPath } from 'ramda'
import dateDistance from './dateDistance'
import limit from './limit'
import pluralize from './pluralize'

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

    setInterval(() => {
      this.setState({ currentDate: new Date() })
    }, 5000)
  }

  setCurrentNote(currentIndex) {
    this.setState({ currentIndex })
  }

  updateTitle(title) {
    const { currentIndex } = this.state

    this.setState(
      set(lensPath(['notes', currentIndex, 'title']), title, this.state)
    )
  }

  updateDesc(desc) {
    const { currentIndex } = this.state

    this.setState(
      set(lensPath(['notes', currentIndex, 'desc']), desc, this.state)
    )
  }

  get current() {
    const { currentIndex, notes } = this.state
    return notes[currentIndex]
  }

  addNote() {
    this.setState(oldState => {
      return {
        currentIndex: 0,
        notes: [
          {
            title: 'New note',
            created: new Date().toISOString(),
            desc: 'Write here'
          },
          ...oldState.notes
        ]
      }
    })
  }

  render() {
    const { currentIndex, notes, currentDate } = this.state

    return (
      <main className="app">
        <aside className="actions-bar">
          <div className="logo">K</div>
          <button className="actions-add" onClick={() => this.addNote()} />
        </aside>
        <nav className="note-list">
          <header>{pluralize(notes.length, 'note', 'notes')}</header>
          <ol>
            {notes.map((note, index) => {
              return (
                <li
                  className={index === currentIndex ? 'selected' : null}
                  onClick={() => this.setCurrentNote(index)}
                >
                  <p className="created">
                    {dateDistance(note.created, currentDate)}
                  </p>
                  <h2>{limit(40, note.title)}</h2>
                  <p className="desc">{limit(80, note.desc)}</p>
                </li>
              )
            })}
          </ol>
        </nav>
        <article className="note">
          {this.current && (
            <>
              <input
                className="note-title"
                value={this.current.title}
                onChange={e => this.updateTitle(e.target.value)}
              />
              <textarea
                className="note-desc"
                value={this.current.desc}
                onChange={e => this.updateDesc(e.target.value)}
              >
                asd
              </textarea>
            </>
          )}
        </article>
      </main>
    )
  }
}

export default App
