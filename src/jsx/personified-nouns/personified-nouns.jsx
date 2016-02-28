'use strict'

var React = require('react')
var PersonifiedNoun = require('./personified-noun.jsx')
var PN = PersonifiedNoun.PN

class PersonifiedNouns extends React.Component {
  render () {
    return <PersonifiedNoun title='Personified Nouns'>
      <p>The reason I'm capitalizing certain words is because I'm considering them Personified Nouns.</p>
      <p>These are my own personal definitions of these words. I'm more interested in the tapestry, the hyper-textual nature, than the objective definition of the terms.</p>
      <p>I don't know what liberty is. It's a lot of things. I want the reader to know that my definition of Liberty is my own, but that I'm trying my best to come up with some sort of objective definition. I can't, I will ultimately fail in this process, but I still think it is beneficial to make an attempt!</p>
      <p>I'm convinced that the means by which I try to define Liberty and Justice and Government, try to make sense of these words and their relationship to my physical reality and very real manifestations of power, is more important than the ends I may reach in my search for an actual definition or <PN>Ultimate Truth</PN>.</p>
      <p>I can't do this to every word, of course. But you'll notice that every Personified Noun is also a hypertext link to my definitions, including links to Wikipedia, and links to my use of the terms.</p>
      <p>I also add intertextual links by taking direct quotations of other Authored Works.</p>
      <p>And of course this is the web, so I add intertextual links in the form of hypertext links to other web pages.</p>
      <p>All of these intertextual links and associations are displayed differently.</p>
      <p><i>Italics</i> are mainly for the titles of Authored Works.</p>
      <p><b>Bold</b> is only for emphasis.</p>
      <p><a>Color</a> is for classic HTML links.</p>
      <p>Personified Nouns are capitalized, and you can indeed click on them, but they don't look like HTML links.</p>
    </PersonifiedNoun>
  }
}

module.exports = PersonifiedNouns
