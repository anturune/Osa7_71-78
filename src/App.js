import React, { useState } from 'react'

import ReactDOM from 'react-dom'
//Custom hookin importti ks. "/src/hooks/index.js"
import { useField } from './hooks'
//Router eristetty "index.js" -fileen
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom"

//Menu näytetään joka paikassa ja niille annetaan oma uniikki polku selaimeen
//href:llä
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/anecdotes' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

/*
//Näin haetaan yksittäinen anekdootti ID:n perusteella, kun ei käytetä "useRouteMatch":a
//Yksittäisen anecdootin näyttäminen id:llä hakien
//useParams:ll saadaan id
const Anecdote = ({ anecdotes }) => {
  console.log('TULIKO Anecdote KOMPONENTTIIN', anecdotes)
  //Tässä käytetään importattua "useParams":a, jolla saadaan näytettävä anecdoten id
  const id = useParams().id
  console.log('ID', id)
  //HUOM! Muutetaan id numeroksi
  const anecdote = anecdotes.find(a => a.id === id)
  console.log('ANEKDOOTTI ', anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has{anecdote.votes}  votes </div>
      <div>for more info see: {anecdote.info}</div>
      <Link to={'/' + anecdote.info}>for more info see: {anecdote.info}</Link>

    </div>
  )
}
*/

//Luodaan linkit jokaiselle anekdootille ja personoidaan URI:t ancdote ID:llä
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content.value}</Link>
        </li>
      )}
    </ul>
  </div>
)

//Näin haetaan yksittäinen anekdootti ID:n perusteella, kun käytetään "useRouteMatch":a
//Luodaan linkit jokaiselle anekdootille ja personoidaan URI:t ancdote ID:llä
const AnecdoteSingleId = ({ anecdote }) => {
  console.log('ANEKDOOTTI ', anecdote)
  return (
    <div>
      <h2>{anecdote.content.value}</h2>
      <div>has{anecdote.votes}  votes </div>
      <div>for more info see: {anecdote.info.value}</div>
      <Link to={'/' + anecdote.info.value}>for more info see: {anecdote.info.value}</Link>
    </div>
  )
}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  /*
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  /*
return (
  <div>
    <h2>create a new anecdote</h2>
    <form onSubmit={handleSubmit}>
      <div>
        content
        <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        author
        <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url for more info
        <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
      </div>
      <button>create</button>
    </form>
  </div>
)

}
*/
  //-----------------------CUSTOM HOOKIET ALKAA-------------------------------------------
  //KÄytettäessä custom hookieta tehdään tällaiset muuttujat
  //Ks.  "import { useField } from './hooks'
  //HUOM! Annetaan datan tyyppi eli tässä "text"
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')



  console.log('CONTENT:', content)

  //console.log('author', authori)
  //console.log('info', infoa)


  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log('TULEEKO HANDLESUBMITTIIN')
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    /*
    console.log('CONTENT VALUE', content.value)
    console.log('CONTENT AUTHOR', author.value)
    console.log('CONTENT INFO', info.value)
    */
  }


  //Kenttien resetoimiseen eli kun on kirjoitettu jotain mihin tahansa kenttään,
  //ne voidaa tyhjätä reset -buttonilla
  //Tähän liittyvä custom hook laajennus "/src/hooks/index.js" fielssä ja "const reset"
  //funktiossa
  const resetClick = () => {
    console.log('RESET CLICKIIN TULI', content.value, content.reset)
    content.reset()
    author.reset()
    info.reset()
  }
  console.log('TÄnnekö sitten')

  //Kun käytetään kenttien täyttämiseen custom hookeja, return muuttuu näin
  //Ks. "/src/hooks/index.js"
  //HUOM! Esimerkin vuoksi kaksi tapaa spread funktio jolloin tarvitaan vain "{...content}",
  //mutta jos ei spread syntaksi, niin silloin ks. alla urlin luominen
  //HUOM! Kun saman input tagin sisällä kaksi buttonia, typet pitää määritellä

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetClick}>reset</button>
      </form>
    </div>
  )

}
//-----------------------CUSTOM HOOKIET LOPPUU-------------------------------------------

//Tällä muotoillaan notificaatio lisämiseen yhteyteen
const NewAddedAnecdotesNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="added">
      {message}
    </div>

  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: {
        value: 'If it hurts, do it more often'
      },
      author: {
        value: 'Jez Humble'
      },
      info: {
        value: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html'
      },
      votes: 0
      ,
      id: '1'
    },
    {
      content: {
        value: 'Premature optimization is the root of all evil'
      },
      author: {
        value: 'Donald Knuth'
      },
      info: {
        value: 'http://wiki.c2.com/?PrematureOptimization'
      },
      votes: 0
      ,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  //Uuden anecdootin lisäämisen jälkeen tehdään redirect "/anecdotes"-pathiin
  //Ks. alla return:sta redirect -tägi--> jos notificaatio tilassa joku muu kuin null
  //näytetään/redirectataan "/anecdotes"
  const addNew = (anecdote) => {

    anecdote.id = (Math.random() * 10000).toFixed(0)
    //console.log('ANECDOTES TAULUKON KOKO ENNEN', anecdotes.length)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification('Uusi anecdote "' + anecdote.content.value + '" lisätty')
    console.log('MILLOIN KÄY addNew:ssä', anecdote)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  /*
  console.log('ANECDOTES TAULUKON KOKO JÄLKEEN', anecdotes.length)
  console.log('ANECDOTES NOTIFICAATIO', notification)
  */
  //"routeMatch":n käyttö, kun halutaan käyttää yksittäisen anecdootin
  //etsiminen ID:n perusteella ennen komponentille lähettämistä
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  /*
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
    */

  //Luodaan Router ja niille Route -lapset sekä Switchit
  //HUOM! Käytettäessä useRouteMatch:a pitää siirtää Router tägi ulkopuolelle,
  //tässä siirretty "index.js"-fileen
  //HUOM! <Menu/> tag ulkopuolella routejen, koska pitää olla näkyvillä
  //joka paikassa. Samaten <Footer/> ulkopuolella routejen samasta syystä
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <NewAddedAnecdotesNotification message={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <AnecdoteSingleId anecdote={anecdote} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          {!notification ? <CreateNew addNew={addNew} /> : <Redirect to="/anecdotes" />}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App;