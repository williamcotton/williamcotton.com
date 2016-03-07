'use strict'

var React = require('react')
var PersonifiedNoun = require('./personified-nouns/personified-noun.jsx')
var PN = PersonifiedNoun.PN

class About extends React.Component {
  render () {
    return <div className='about-container'>
      <h1>About</h1>
      <p>All the articles are React components. They're committed to Git. They stay versioned, with a full history. This website is a <a href='https://github.com/williamcotton/williamcotton.com'>private Git repository hosted on GitHub</a>. If you send me a nice email explaining why you'd like to have access to this repository I'd be more than happy to add you as a collaborator.</p>
      <p>Articles are not in a CMS. This is not a Wiki. Wiki's also have edit histories and change logs, but I prefer Git and React. I need to be able to write code along with my articles.</p>
      <p>There's no real system, but I'm interested in exploring a use of <PN>Personified Nouns</PN>, where I have internal hyperlinks, that are clickable, but they don't look like other hyperlinks.</p>
      <p><PN>Personified Nouns</PN> were used by 19th century poets to allow them to work with personal, subjective interpretations of lofty terms and ideals.</p>
      <p>I'd like to make this website a kind of poetry, of code, ideas, and textual interactions with the world at large.</p>
      <p>There's a lot of discussion happening in forums in manners that don't work very well for the kinds of conversations and interactions that I'd like to be engaging in.</p>
      <p>Facebook and Twitter are not for the things I'd like to make. Neither are Wikis.</p>
      <p>I like to make web pages, with images, links, and full control over the layout and interactions.</p>
    </div>
  }
}

module.exports = About
