'use strict'

var React = require('react')
var ReactBootstrap = require('react-bootstrap')
var Table = ReactBootstrap.Table
var Highlight = require('react-highlight')
var Article = require('./article.jsx')

var C = require('../lib/markup.jsx').C
var P = require('../lib/markup.jsx').P
var F = require('../lib/markup.jsx').F
var p = require('../lib/markup.jsx').p

class IntroToExpect extends React.Component {
  render () {
    return <Article title='From Web 2.0 to Web 2016' >
      <h3>The Changing Landscape of Digital Cultural Production and why need Public Platforms for Digital Ownership</h3>

      <p>As the social media and smartphone fueled <a href='http://techcrunch.com/2016/02/28/even-peter-thiel-has-got-soul/'>gold rush comes to an end</a>, and a few corporations begin to entrench their positions, <b>we're beginning to see a very different mode of cultural production than we saw in Web 2.0</b>. Commercial activity is big business in Web 2016. While a few new professions were born during the last decade, what really defines today's media landscape is the inclusion of a large number of existing corporate-sponsored professions in to the cultural production of the Web. Hollywood is back in business and <b>now there's an eager public with open wallets willing to pay for the production of professional content</b>. This kind of commercial cultural production is wonderful to see, but <b>the Internet still offers us ways to maintain the voluntary, decentralized and democratic energies of Web 2.0</b>. In order to survive the return of 20th century corporate notions of Copyright, we need to embrace a more fundamental <b>author-centric notion of Copyright</b>. We need to extend the entitlements and privilidges of <b>private property and financial assets</b> to the citizens of the Web in order to protect the fundamental nature of the Web.</p>

      <p>Blockai has developed an open-source and open-data protocol called <a href='https://github.com/blockai/openpublish'>Open Publish</a> which allows for people to <b>register digital assets that represent claims of ownership over digital media</b>. We've turned the Open Publish registration process in to a product that <a href='https://www.blockai.com'>you can try out for yourself</a> We think that Blockai and Open Publish have what it takes to release <a>The Dormant Value of Digital Cutural Production</a>.</p>

      <p>There's no better way to define Web 2.0 than by the <a href='https://en.wikipedia.org/wiki/Web_2.0'>definition of Web 2.0 on Wikipedia</a>. Web 2.0 mainly defines itself in relation to Web 1.0, and I'd like to defined Web 2016 in a similar trajectory.</p>

      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Web 1.0</th>
            <th>Web 2.0</th>
            <th>Web 2016</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DoubleClick</td>
            <td>Google AdSense</td>
            <td>Facebook Instant Articles</td>
          </tr>
          <tr>
            <td>Ofoto</td>
            <td>Flickr</td>
            <td>Shutterstock</td>
          </tr>
          <tr>
            <td>Akamai</td>
            <td>BitTorrent</td>
            <td>Netflix</td>
          </tr>
          <tr>
            <td>mp3.com</td>
            <td>Napster</td>
            <td>Spotify</td>
          </tr>
          <tr>
            <td>Britannica Online</td>
            <td>Wikipedia</td>
            <td>Wikipedia Fundraisers</td>
          </tr>
          <tr>
            <td>personal websites</td>
            <td>blogging</td>
            <td>Facebook</td>
          </tr>
          <tr>
            <td>evite</td>
            <td>upcoming.org and EVDB</td>
            <td>Paperless Post</td>
          </tr>
          <tr>
            <td>domain name speculation</td>
            <td>search engine optimization</td>
            <td>private business relationships</td>
          </tr>
          <tr>
            <td>page views</td>
            <td>cost per click</td>
            <td>pay per view</td>
          </tr>
          <tr>
            <td>screen scraping</td>
            <td>web services</td>
            <td>restricted API access</td>
          </tr>
          <tr>
            <td>publishing</td>
            <td>participation</td>
            <td>work for hire</td>
          </tr>
          <tr>
            <td>content management systems</td>
            <td>wikis</td>
            <td>Fiverr</td>
          </tr>
          <tr>
            <td>directories (taxonomy)</td>
            <td>tagging (folksonomy)</td>
            <td>Facebook News Feed algorithm (private-interest filtering)</td>
          </tr>
          <tr>
            <td>stickiness</td>
            <td>syndication</td>
            <td>subscriptions</td>
          </tr>
          <tr>
            <td>HTML</td>
            <td>RSS</td>
            <td>Bitcoin</td>
          </tr>
        </tbody>
      </Table>

      <p>If the key features of Web 2.0 include:</p>

      <ol>
        <li><b>Folksonomy</b> - free classification of information; allows users to collectively classify and find information (e.g. tagging)</li>
        <li><b>Rich User Experience</b> - dynamic content; responsive to user input</li>
        <li><b>User Participation</b> - information flows two ways between site owner and site user by means of evaluation, review, and commenting. Site users add content for others to see
        </li>
        <li><b>Software as a service</b> - Web 2.0 sites developed APIs to allow automated usage, such as by an app or mashup</li>
        <li><b>Mass Participation</b> - Universal web access leads to differentiation of concerns from the traditional internet user base</li>
      </ol>

      <p>Then the key features of Web 2016 become:</p>

      <ol>
        <li>Folksonomy is replaced by <b>opaque sorting and ranking algorithms</b> controlled by corporate self-interest, as opposed to communal self-interest. Professional editorialism never went away. We're still tuning in to Fox News, ESPN, and Chelsea Handler and reading them online.</li>
        <li>Rich User Experience is replaced with a <b>poor user experience</b>, with bloated web pages full of advertisements, paywalls, and ad blocking wars. The need for artificial scarcity to create the market conditions for an information economy never went away.</li>
        <li>User Participation is replaced <b>small number of professional producers</b> and large number of consumers. Mass Media never went away. People continue to appreciate the relationship between stage and audience, writer and reader.</li>
        <li>Software as a service turned in to <b>restricted API access</b>. Subscription data services never went away. Bloomberg continues to sell professional terminals, and Getty continues to sell professional photographs.</li>
        <li>Mass Participation is replaced by <b>private, limited web access</b>, such as Internet.org, which leads to limited choice. The private relationships between self-interested publishers and distributors never went away. Sony and Spotify are engaged in opqaue business deals.</li>
      </ol>

      <p>If Web 2.0 is the optimism of <a href='http://www.shirky.com/weblog/2010/04/the-collapse-of-complex-business-models/'>Clay Shirky</a>, Web 2016 exemplified by the bitterness and pessimism of outsiders like <a href='http://motherboard.vice.com/read/its-2016-and-the-promise-of-the-internet-is-dead'>Carles</a> and <a href='http://tomslee.net/2016/02/whats-yours-is-mine-reviews-and-other-coverage.html'>Tom Slee</a> and insiders like <a href='http://paulgraham.com/re.html'>Paul Graham</a> and <a href='https://medium.com/@ev/maturing-markets-higher-stakes-closing-doors-ae69da6c764#.qffjsv2cb'>Ev Williams</a>.</p>

      <p>This is not a criticism of Web 2.0 nor the <b>wonderful new modes of production</b> that were introduced. Whereas previous critique of Web 2.0 has focused on the aesthetic and moral values of cultural production, with works like <a href='https://en.wikipedia.org/wiki/The_Cult_of_the_Amateur'>Cult of the Amatuer</a> by Andrew Keen, contemporary critique of the modes of production are financial and political in nature, like <a href='https://en.wikipedia.org/wiki/The_People%27s_Platform:_Taking_Back_Power_and_Culture_in_the_Digital_Age'>The People's Platform</a> by Astra Taylor.</p>

      <p>Netflix, Amazon and Apple are continuing to finance what many are calling the <a href='https://en.wikipedia.org/wiki/Golden_Age_of_Television_(2000s%E2%80%93present)'>Golden Age of Television</a>. These are big budget creations made by a pre-existing and historical mode of cultural production. The Hollywood Studio system, it's Guilds and complex and opaque system of accounting, remain fully functional. Financing the creation and distribution of Copyrighted Works and other forms of intellectual property are important parts of what keeps the industry produtive and functional, even as it deals with the weight of collective bargaining and stardom.</p>

      <p>It is hardly fair to call the media landscape of Web 2016 a sort of Fuedalism, even though analogies to content farms are apt. Feudalism implied a lack of choice on behalf of the participants. Just as No One Force You To Shop at Wal-Mart, no one forces you to use Facebook.</p>

      <p>But for those either on the inside or outside of Web 2016, the future is starting to look pretty grim for those of us who yearn for the optimism of our democratic and decentralized rhetoric of our recent past.</p>

      <p>There's a danger that this pessimism could turn people against Capitalism as they point the blame at the very notion of private property. Blockai and Open Publish want to make sure that the corporate abuses that we associate with both Capitalism and Copyright belie the underlying protections to life and liberty that we sometimes may take for granted.</p>

      <p>There's also a danger that this pessimism could turn people against universal rights, decentralized and democratic models of production with a return of language related to colonialism and class structure. Blockai and Open Publish want to make sure that the equal and public access nature of the Web remains healthy and intact.</p>

      <p>Blockai and Open Publish posit that our future is bright and we see a lot of room for continued innovation in the creation, distribution and professional production of digital media. We just need to embrace our already existing notions of capital and apply them to the Web. The problem isn't with the commercial nature of the Web, it's with an ineffifient market mechanism for open and free marketplaces for intellectual property.</p>
      <p>We're not stuck with Web 2016. Next year we get Web 2017, and the following year, Web 2018. We have a lot of great things to look forward to! Open Publish is open source. We would love your feedback and help. </p>
      <p>Blockai is our commerical product, and we would love to serve you!</p>
    </Article>
  }
}

module.exports = IntroToExpect
