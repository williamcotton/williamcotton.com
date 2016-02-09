'use strict'

var React = require('react')
var Highlight = require('react-highlight')
var Article = require('./article.jsx')

var C = require('../lib/markup.jsx').C
var P = require('../lib/markup.jsx').P
var F = require('../lib/markup.jsx').F
var p = require('../lib/markup.jsx').p

class IntroToExpect extends React.Component {
  render () {
    return <Article title='An Introduction To Expect' >
      <p><strong>Expect</strong> is a framework for building <strong>universal web applications</strong> using <strong>Express</strong> and <strong>React</strong>.</p>
      <p>
        Let's start by defining a route handler for an About page. This should seem very familiar to a lot of web developers.
      </p>
      <Highlight className='javascript'>
{`app.get('/about', (req, res) => {
  var content = <About />
  res.renderApp(content, {title: 'About'})
})`}
      </Highlight>
      <p>
        When someone visits the {P('/about')} path the server will render the {C('About')} component.
      </p>
      <Highlight className='javascript'>
{`class About extends React.Component {
  render () {
    return <div className='about-container'>
      <h1>About</h1>
      <p>This is an Expect application.</p>
    </div>
  }
}`}
      </Highlight>
      <h3>Server-side Web Applications</h3>
      <p>
        If we were doing the same thing in <a href='https://www.ruby-lang.org/en/'>Ruby</a> using <a href='http://www.sinatrarb.com/'>Sinatra</a>, it would look something like this:
      </p>
      <Highlight className='ruby'>
{`get '/about' do
  erb :about
end`}
      </Highlight>
      <p>Or in <a href='https://www.python.org/'>Python</a> with <a href='http://flask.pocoo.org/'>Flask</a>:</p>
      <Highlight className='python'>
{`@app.route('/about')
def about():
    return render_template('about.html')`}
      </Highlight>
      <p>
        In all of the above examples we've got a dynamically-typed, interpreted language, running a minimalistic request-to-route-handler framework on a server that renders HTML using a templating engine.
      </p>
      <p>
        With Expect we're using <a href='https://nodejs.org/en/'>Node</a> and <a href='http://expressjs.com/'>Express</a> with a custom middleware that attaches the {F('renderApp()')} function to the route handler's {p('res')} object on every request. This allows us to render <a href='https://facebook.github.io/react/'>React</a> components on the server.
      </p>
      <p>
      <strong>
      <span className='text-success'>Exp</span><span className='text-primary'>ect</span> = <span className='text-success'>Node Express router</span> × <span className='text-primary'>React static markup renderer</span>
      </strong>
      </p>
      <Highlight className='javascript'>
{`var express = require('express')
var app = express()

var expectReactRenderer = require('expect-react-renderer/server')

app.use(expectReactRenderer({
  rootDOMId: 'universal-app-container',
  RootComponent,
  app,
  defaultTitle,
  template
}))`}
      </Highlight>
      <p>
        Much like a <a href='http://flask.pocoo.org/docs/0.10/patterns/templateinheritance/#base-template'>base template in Flask</a> or <a href='http://www.sinatrarb.com/intro.html#Named%20Templates'>named template layouts in Sinatra</a>, the {C('RootComponent')} acts as the master layout container for our content components.
      </p>
      <Highlight className='javascript'>
{`class RootComponent extends React.Component {
  render () {
    var content = this.props.content
    return <div className='root-component-container'>
      <div className='container main-container'>
        { content }
      </div>
    </div>
  }
})

module.exports = RootComponent
`}
      </Highlight>
      <p>
        So far what we're doing with Expect looks and works the same as what we could be doing with Ruby/Sinatra/ERB, or with Python/Flask/Jinja. In fact, if we've made sure that the templates all <strong>rendered the exact same HTML</strong> mapped to the <strong>same routes</strong>, it would be impossible for a web client to tell them apart.
      </p>
      <Highlight className='html'>
{`<form action='/item/123' method='post'>
  <input type='text' name='title' />
  <input type='submit' value='Submit' />
</form>`}
      </Highlight>
      <p>This <strong>same basic HTML form</strong> can be used to post to each of these <strong>different frameworks</strong> in the <strong>same manner</strong>.</p>
      <Highlight className='python'>
{`@app.route('/item/<int:item_id>', methods=['POST'])
def update_item(item_id):
    title = request.form['title']
    if len(title) >= 3
      update_item_title(item_id, title)
      return redirect('/item/' + item_id)`}
      </Highlight>
      <Highlight className='ruby'>
{`post '/item/:item_id' do
  item_id = params[:item_id]
  title = params[:title]
  if title.length >= 3
    update_item_title(item_id, title)
    redirect '/item/' + item_id
  end
end`}
      </Highlight>
      <Highlight className='javascript'>
{`app.post('/item/:item_id', (req, res) => {
  var item_id = req.params.item_id
  var title = req.body.title
  if (title.length >= 3) {
    req.item.updateTitle({item_id, title}).then(item => {
      res.redirect('/item/' + item_id)
    })
  }
})`}
      </Highlight>
      <p>
        On the server and within the context of a web application, the differences between these languages and frameworks are negligible. They each have their pros and cons when it comes to criteria like legibility, execution speed, type checking and syntatic sugar.
      </p>
      <p>
        All of these frameworks speak the <strong>fundamental language of the web</strong>, the <strong>HTTP request and response</strong> life cycle.
      </p>
      <img className='http-cycle' src='https://qph.is.quoracdn.net/main-qimg-a4f61effda6033d6c408ecab70fccc30?convert_to_webp=true' />
      <h3>Client-side Web Applications</h3>
      <p>
        Being that they are server-side frameworks, Flask and Sinatra <strong>don't run in the web browser</strong>. If we were using these frameworks and were to try and do something <strong>interactive</strong> like client-side form validation <strong>we would be on our own</strong>.
      </p>
      <p>
        We could use <a href='https://jquery.com/'>jQuery</a>:
      </p>
      <Highlight className='html'>
{`<form>
    <input type='text' name='title' minlength='3' required>
    <input type='submit' value='Submit'  disabled/>
</form>
<script src='jquery.js'></script>
<script src='jquery.validate.js'></script>
<script>
$('form').change(function (event) {
  var isValid = $('form').validate()
  $('input[type="submit"]').prop('disabled', !isValid)
})
$('form').submit(function (event) {
  var isValid = $('form').validate()
  // ...
})
</script>`}
      </Highlight>
      <p>
        Or we could use an enterprise-grade framework like <a href='https://angularjs.org/'>Angular</a>:
      </p>
      <Highlight className='html'>
{`<div ng-app='validationApp' ng-controller='mainController'>
  <form ng-submit='submitForm(userForm.$valid)'>
    <input type='text' name='title' ng-model='title' ng-minlength='3' required>
    <input type='submit' value='Submit' ng-disabled='userForm.$invalid' />
  </form>
</div>
<script src='angular.js'></script>
<script>
var validationApp = angular.module('validationApp', [])
validationApp.controller('mainController', function ($scope) {
  $scope.submitForm = function (isValid) {
    // ...
  }
})
</script>`}
      </Highlight>
      <p>
        <strong>No matter what we use</strong>, say <a href='http://dustinfarris.com/ember-django-adapter/'>Python/Django/Ember</a> or <a href='http://blog.honeybadger.io/beginners-guide-to-angular-js-rails/'>Ruby/Rails/Angular</a>, <strong>we're going to have to maintain two completely seperate but instrinsically coupled code bases</strong>, our server-side application in our language of choice and our client-side application in browser-compatible JavaScript.
      </p>
      <p>
        Or we could pick a <strong>single language</strong> and maintain a <strong>single code base</strong>.
      </p>
      <h3>Universal Web Applications</h3>
      <p>
        With Expect, we run the <strong>same route handlers</strong> and render the <strong>same React components</strong> in <strong>both the web browser and the web server</strong>.
      </p>
      <Highlight className='javascript'>
{`app.post('/item/:item_id', (req, res) => {
  var item_id = req.params.item_id
  var title = req.body.title
  if (title.length >= 3) {
    req.item.updateTitle({item_id, title}).then(item => {
      res.redirect('/item/' + item_id)
    })
  }
})`}
      </Highlight>
      <p>
        Our {p('app')} in the context of the web browser is an instance of <a href='https://www.npmjs.com/package/browser-express'>Browser Express</a>.
      </p>
      <Highlight className='javascript'>
{`var express = require('browser-express')
var app = options.app || express({
  interceptLinks: true,
  interceptFormSubmit: true,
  document,
  window
})`}
      </Highlight>
      <p>
        Browser Express, like the Node server-side equivilent, has middleware, and just like with the server, the  middleware attaches the {F('renderApp()')} function to the route handler's {p('res')} object on every request.
      </p>
      <Highlight className='javascript'>
{`app.use(expectBrowserReactRenderer({
  rootDOMId: 'universal-app-container',
  RootComponent,
  app,
  document,
  localStorage
}))`}
      </Highlight>
      <p>
        These two middleware, along with the the server-side Express {p('app')} and the client-side Browser Express {p('app')}, all present and expect the <strong>same application interfaces</strong> but execute in <strong>two completely different contexts</strong>.
      </p>
      <p>
      <strong>
      <span className='text-success'>Exp</span><span className='text-primary'>ect</span> = ( <span className='text-success'>Browser Express router</span> × <span className='text-primary'>React DOM renderer</span> ) + ( <span className='text-success'>Node Express router</span> × <span className='text-primary'>React static markup renderer</span> )
      </strong>
      </p>
      <Highlight className='javascript'>
{`app.use(expectServerReactRenderer({
  rootDOMId: 'universal-app-container',
  RootComponent,
  app,
  defaultTitle,
  template
}))`}
      </Highlight>
      <p>
        The server and browser middleware both expect the same {C('RootComponent')} and {p('rootDOMId')}.
      </p>
      <p>
        They differ in that when asked to render {p('content')}, the browser calls the {F('ReactDOM.render()')} function and expects a dynamic DOM {p('document')} environment, while the server calls the {F('ReactDOMServer.renderToStaticMarkup()')} function and expects a static EJS {p('template')}.
      </p>
      <Highlight className='javascript'>
{`app.get('/item/:item_id/edit', (req, res) => {
  var item_id = req.params.item_id
  req.item.find({item_id}).then(item => {
    var action = '/item/' + item.id
    var content = <form action={action} method='post'>
      <input type='text' name='title' defaultValue={item.title} />
      <input type='submit' value='Submit' />
    </form>
    res.renderApp(content)
  })
})`}
      </Highlight>
      <p>
        In the browser when someone submits the form, Browser Express will <strong>intercept the event</strong> and <strong>prevent the HTTP POST</strong>, and turn it in to a {p('req')} object and call the matching request handler:
      </p>
            <Highlight className='javascript'>
{`app.post('/item/:item_id', (req, res) => {
  var item_id = req.params.item_id
  var title = req.body.title
  if (title.length >= 3) {
    req.item.updateTitle({item_id, title}).then(item => {
      res.redirect('/item/' + item_id)
    })
  }
})`}
      </Highlight>
      <p>
        Which will then redirect the request to show the updated item:
      </p>
      <Highlight className='javascript'>
{`app.get('/item/:item_id', (req, res) => {
  var item_id = req.params.item_id
  req.item.find({item_id}).then(item => {
    var content = <div>
      <h3>{item.title}</h3>
    </div>
    res.renderApp(content)
  })
})`}
      </Highlight>
      <p>
        Browser Express functions like any other <strong>single page application</strong> framework in that <strong>the page doesn't reload between actions</strong> and instead uses <strong>client-side XHR</strong> to communicate with the server.
      </p>
      <p>
        In the exact same manner as <a href='https://facebook.github.io/flux/docs/overview.html'>Flux</a>, <strong>data in an Expect application flows in a single direction</strong>. Our <a href='http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html'>“action creator”</a> is nothing more than an HTML {C('form')} and our <a href='http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html'>“dispatcher”</a> either an Express or a Browser Express {p('app')}, depending on the context.
      </p>
      <img src='https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png' />
      <p>
        When we really start to see the advantage of this approach is when we package up the universal route handlers and components in to a {p('universalApp')} and present a <strong>single module to all environments</strong>, the server-side Express app and the client-side Browser Express app.
      </p>
      <Highlight className='javascript'>
{`var React = require('react')
var FrontPage = require('./front-page.jsx')

var universalApp = (options) => {
  var app = options.app

  app.get('/', (req, res) => {
    var content = <FrontPage />
    res.renderApp(content)
  })

  return app
}

module.exports = universalApp
`}
      </Highlight>
      <Highlight className='javascript'>
{`var express = require('express')
var app = express()
universalApp({app})
`}
      </Highlight>
      <Highlight className='javascript'>
{`var browserExpress = require('browser-express')
var app = browserExpress()
universalApp({app})
`}
      </Highlight>
      <p>
        All routes defined by the {p('universalApp')} will render HTML on the server, resulting in <strong>faster page loads</strong> that are <strong>optimized for search engines and other web crawlers</strong>. Not only that, but our entire application <strong>will work with JavaScript disabled</strong> in the web browser. This approach implicitly adds support for a wide range of <strong>text-mode browsers</strong> and <strong>screen readers</strong>.
      </p>
      <p>
        When building <strong>with the right set of expectations</strong>, the interactive elements of a web application form a layer of <strong>progressive enhancement</strong>, which allows for <strong>universal accessibility</strong>.
      </p>
      <Highlight className='javascript'>
{`class EditItem extends React.Component {
  render () {
    var item = this.props.item
    var action = '/item/' + item.id
    var err = this.props.err
    return <form action={action} method='post'>
      { err === TitleInvalidError ? <p>Title is too short</p> : false }
      <input type='text' name='title' defaultValue={item.title} onChange={e => this.setState({isValid: e.targe.value.length >= 3})}/>
      <input type='submit' value='Submit' disabled={!this.state.isValid} />
    </form>
  }
  getInitialState () {
    return {isValid: true}
  }
  componentDidMount () {
    this.setState({isValid: false})
  }
}`}
      </Highlight>
      <p>
        What we're expecting is the <strong>best of both worlds</strong>, a fully featured server-side web application that is <strong>completely accessible</strong> and a client-side web application that is <strong>completely interactive</strong>.
      </p>
      <Highlight className='javascript'>
{`app.get('/video-game', (req, res) => {
  var width = req.query.width || 150
  var height = req.query.height || 150
  res.renderApp(<canvas style={{
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    margin: 30,
    width: width,
    height: height
  }} ref={canvas => {
    if (!canvas) return
    canvas.width = width * 2 // @2x
    canvas.height = height * 2 // @2x
    var ctx = canvas.getContext('2d')
    ctx.scale(2, 2) // @2x
    ctx.fillStyle = 'rgb(200,0,0)'
    ctx.fillRect(10, 10, 55, 50)
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(30, 30, 55, 50)
  }}><p>Sorry, this is interactive-only content!</p></canvas>)
})
`}
      </Highlight>
      <p>
        Of course, <strong>sometimes</strong> our requirements are a <strong>client-side-only experience</strong>, as would be the case with a <strong>fully interactive canvas-based video game</strong>.
      </p>
      <Highlight className='javascript'>
{`app.post('/item/:item_id', (req, res) => {
  var item_id = req.params.item_id
  var title = req.body.title
  req.item.updateTitle({item_id, title}).then(item => {
    res.redirect('/item/' + item_id)
  }, err => {
    var content = <EditItem item={item} err={err} />
    res.renderApp(content)
  })
})`}
      </Highlight>
      <p>
        But <strong>most of the time</strong> our applications are doing nothing more than <strong>submitting text and binary file data</strong>, performing some operations, and returning a rendered component.
      </p>
      <Highlight className='javascript'>
{`app.get('/chart', (req, res) => {
  var data = [{color: 'red', value: 20}, {color: 'blue', value: 12}, {color: 'green', value: 18}]
  var d3 = require('d3')
  var ReactFauxDOM = require('react-faux-dom')
  var list = ReactFauxDOM.createElement('ul')
  d3.select(list)
    .selectAll('li')
    .data(data)
    .enter()
    .append('li')
    .style('color', 'white')
    .style('padding', '5px')
    .style('width', d => d.value * 10 + 'px')
    .style('background-color', d => d.color)
    .text(d => d.color)
  res.renderApp(list.toReact())
})`}
      </Highlight>
      <p>
        Even if that component is something as <strong>complex as a <a href='https://d3js.org/'>d3</a> chart</strong> rendered using <a href='https://github.com/Olical/react-faux-dom'>react-faux-dom</a>, there is no reason why we shouldn't <strong>use the server to render our components whenever possible</strong>.
      </p>
      <Highlight className='javascript'>
{`app.post('/files/upload', (req, res) => {
  req.file.upload({file: req.file}).then(file => {
    res.redirect('/files/' + file.sha1)
  }).catch(err => {
    var content = <UploadFile errors={err} file={file} />
    res.renderApp(content)
  })
})`}
      </Highlight>
      <p>
        We might have to build something really complex, like a real-time multithreaded chat app, or an entire photo editing suite, in which case we could benifit from a predicitable state container like <a href='http://redux.js.org/'>Redux</a>, however, starting with something as powerful as this can often be <strong>more trouble than it is worth</strong>.
      </p>
      <p>
        With the right middleware for both Express and Browser Express, and <strong>with the right set of expectations</strong>, anything is possible!
      </p>
      <h3>Universal Middleware and Server-side Persistance</h3>
      <p>
        By now it should be obvious that we're always going to be developing Express and Browser Express middleware in parallel in order to support things like {F('req.item.updateTitle()')} in our {p('universalApp')}.
      </p>
      <Highlight className='javascript'>
{`app.use(expectServerRpc({
  reqProp: 'item',
  context: Item,
  find: Item => {
    return (req, res, options, callback) => {
      Item.find(options, callback)
    }
  },
  updateTitle: Item => {
    return (req, res, options, callback) => {
      Item.updateTitle(options, callback)
    }
  }
}))`}
      </Highlight>
      <Highlight className='javascript'>
{`app.use(expectBrowserRpc({
  request: request
}))`}
      </Highlight>
      <p>
        But <strong>that doesn't mean we need to be constantly repeating ourselves</strong>. In most cases a simple RPC is sufficient because our universalApp is <strong>purposefully coupled</strong>.
      </p>
      <p>
        Using this middleware means that RPC functions defined on the server will <strong>automatically be added to the {p('req')} object</strong> in the browser as a <strong>simple XHR call to a JSON endpoint</strong> on the server.
      </p>
      <p>
        On the server, the {p('Item')} object could be just about anything, from a simple <strong>MongoDB client</strong> to an <strong>object-relation Bookshelf model</strong> connected to Postgres.
      </p>
      <p>
        What is important is that the server-side middleware calls the functions on the {p('Item')} object in the same scope as the incoming {p('req')} and {p('res')} objects, which will come in handy once we're ready to work with sessions and user authentication.
      </p>
      <p>
        In many ways Expect could be considered in terms of the classical model-view-controller relationship, with React rendering <strong>views</strong> that are <strong>controlled</strong> by an Express app. 
      </p>
      <p>
        Anything we might consider a <strong>model</strong> and any notion of persistance should be considered <strong>outside of the scope of an Expect application</strong>, but using the RPC middleware makes it very easy to bridge the gap.
      </p>
      <p>
        Perhaps in the future as an application increases in complexity we would benefit from creating a more advanced solution using a custom GraphQL middleware instead of our simple and lightweight RPC middleware.
      </p>
      <Highlight className='javascript'>
{`app.get('/item/:item_id', async ({params: {item_id}, query}, {renderApp}) => {
  let item = await query(\`item(id: $item_id) { title }\`, {item_id})
  renderApp(<div><h3>{item.title}</h3></div>)
})

app.post('/item/:item_id', async ({params: {item_id}, {body: {title}, mutation}, {renderApp}) => {
  let item = await mutation(\`updateItemTitle(id: $item_id title: $title) { title }\`, {item_id, title})
  renderApp(<div><h3>{item.title}</h3></div>)
})`}
      </Highlight>
      <p>
        However, starting with something as powerful as GraphQL can often be <strong>more trouble than it is worth</strong> when building a new web application.
      </p>
      <h3>Beyond the Browser</h3>
      <p>
        Both Browser Express and our {p('universalApp')} are incredibly portable and work just fine when <a href='https://github.com/williamcotton/universal-react/blob/master/src/js/electron/main.js'>embedded in and distributed as an electron application</a>, meaning the <strong>same core set of logic and components</strong> can be delivered and executed not only within the context of web browsers but also as fully-featured <strong>Windows</strong> and <strong>Mac OS X desktop applications</strong>, with additional access to the file system and TCP sockets.
      </p>
      <Highlight className='javascript'>
{`var express = require('browser-express')
var app = express({
  interceptLinks: true,
  interceptFormSubmit: true,
  abstractNavigation: true, // abstract navigation means it does not use browser history and page navigation, which is fine because desktop apps don't need to affect or be affected by the UI related to URLs
  document: options.document,
  window: options.window
})
universalApp({app})`}
      </Highlight>
      <p>We could even imagine a way to use the very same {p('universalApp')} in the context of specialized Express Workers with custom middleware that <strong>subscribe to a message queue</strong> and process requests in to <strong>pre-rendered HTML for caching</strong>.
      </p>
    </Article>
  }
}

module.exports = IntroToExpect
