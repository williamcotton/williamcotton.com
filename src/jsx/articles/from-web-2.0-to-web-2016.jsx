'use strict'

var React = require('react')
var ReactBootstrap = require('react-bootstrap')
var Table = ReactBootstrap.Table
var Button = ReactBootstrap.Button
var Article = require('./article.jsx')

class IntroToExpect extends React.Component {
  render () {
    return <Article title='From Web 2.0 to Web 2016' >
      <h3>The Need For Public Platforms for Digital Ownership</h3>

      <p>The Web 2.0 paradigm has been outgrown and we've arrived somewhere else. The common values underlying web business cycles today are no longer those enumerated ten years ago as belonging to Web 2.0. Still, the Web 2.0 narrative was influential, it was a story that was retold, adapted, interpreted and marketed to great effect. Did we learn anything by gathering up vast fields of social and economic activity under a common narrative? How could we do that today?</p>

      <p>This article is an attempt to establish a continuation of the narrative that Tim O'Reilly began around 2004 with his articulation of Web 2.0.</p>

      <p>Web 2.0 mainly defined itself in relation to Web 1.0, and I'd like to define a 'Web 2016' along a similar trajectory, extending the path laid out by Tim O'Reilly in his essay <a href='http://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html'>What Is Web 2.0</a>. Below, I've added a third column to a table that appeared in that essay: </p>

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
            <td>algorithmic filtering</td>
          </tr>
          <tr>
            <td>stickiness</td>
            <td>syndication</td>
            <td>paywalls</td>
          </tr>
        </tbody>
      </Table>

      <p>If <a href='https://en.wikipedia.org/wiki/Web_2.0#Characteristics_2'>Wikipedia's key features of Web 2.0</a> include:</p>

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
        <li>Folksonomy becomes a <b>third-party editorial algorithm</b>. Professional editorship never went away. We're still tuning into Fox News, ESPN, and Chelsea Handler and reading them online, even if they are now using information technology to assist in the editorial process. Facebook uses algorithmic filters to provide a better experience than would be provided by the raw undifferentiated stream.</li>
        <li>Rich User Experience becomes a <b>poor user experience</b>, with bloated web pages full of advertisements, paywalls, and ad-blocking wars. The need for artificial scarcity to create the market conditions for an information economy never went away.</li>
        <li>User Participation becomes a <b>small number of professional producers</b> and large number of consumers. Mass Media never went away. People continue to appreciate the relationship between stage and audience, writer and reader. Charlie Bit My Finger is replaced by traditional pop stars as the <a href='https://en.wikipedia.org/wiki/List_of_most_viewed_YouTube_videos'>most viewed videos on YouTube</a>.</li>
        <li>Software as a service becomes <b>restricted API access</b>. Twitter has long since abandoned the grassroots network of clients and has added many restrictions to its API. Subscription data services never went away. Bloomberg continues to sell professional terminals, and Getty continues to sell professional photographs.</li>
        <li>Mass Participation becomes <b>private, limited web access</b>, such as Free Basics, which leads to limited choice. The private relationships between self-interested publishers and distributors never went away. <a href='http://www.theverge.com/2015/5/19/8621581/sony-music-spotify-contract'>Sony and Spotify</a> are engaged in opaque business deals, as now are Spotify and Facebook Messenger.</li>
      </ol>

      <p>Please keep in mind that I'm not suggesting those Web 2.0 features have been completely abandoned or annihilated, but that, as happened a decade ago, there has been a shift towards these new sorts of features and away from the old. The Web 2016 rubric could be applied to any number of phenomena, but for the remainder of this essay I want to focus on cultural productions – articles, songs, videos, films, photos, memes, texts – because they constitute a realm within which the shift is easily apparent, because they were a crucial part of the original Web 2.0 discussion and success, and because for the past 15 years I've been living the dual life a software developer and a musician. As such discussions go, this will lead me to talk a bit about copyright, but I promise it will be painless and hopefully optimism-inducing.</p>

      <p>Issues with poor user experiences are being solved in a number of different ways. Apple and Google both allow for <b>third-party ad blocking</b> software to run on their devices, for one. Facebook with Instant Articles and Google with AMP are both attempting to reduce the weight of advertisements in mobile content through <b>revenue sharing</b> programs. That private companies could or should opaquely control the entire commercial marketplace of the Web has some <a href='http://recode.net/2016/02/24/google-amp-is-less-about-beating-facebook-at-news-more-about-gobbling-up-the-mobile-web/'>people worried</a>.</p>

      <p>If Web 2.0 is the optimism of <a href='http://www.shirky.com/weblog/2010/04/the-collapse-of-complex-business-models/'>Clay Shirky</a>, Web 2016 is the growing bitterness and pessimism of outsiders like <a href='http://motherboard.vice.com/read/its-2016-and-the-promise-of-the-internet-is-dead'>Carles</a> and <a href='http://tomslee.net/2016/02/whats-yours-is-mine-reviews-and-other-coverage.html'>Tom Slee</a> and insiders like <a href='https://medium.com/@ev/maturing-markets-higher-stakes-closing-doors-ae69da6c764#.qffjsv2cb'>Ev Williams</a>. Whereas previous critique of Web 2.0 has focused on the aesthetic and moral values of cultural production, exemplified by works such as <a href='https://en.wikipedia.org/wiki/The_Cult_of_the_Amateur'>The Cult of the Amateur</a> by Andrew Keen, contemporary criticism of the Web 2016 modes of production are financial and political in nature, like <a href='https://en.wikipedia.org/wiki/The_People%27s_Platform:_Taking_Back_Power_and_Culture_in_the_Digital_Age'>The People's Platform</a> by Astra Taylor. These changing critiques reflect the dynamic shift from the aesthetic and moral conditions of Web 2.0 to the financial and political conditions of Web 2016.</p>

      <p>There are many great applications and services from Web 2.0, so I don't want to knock the entire era. Wikipedia, The Internet Archive, Patreon, Kickstarter and many other services are bearing wonderful fruits and I expect these to continue. Web 2.0 never went away, but the subtle difference is, the <a href='http://www.shirky.com/weblog/2010/04/the-collapse-of-complex-business-models/'>collapse of complex business models</a> like the Hollywood studio system never happened. Hollywood never went away either! The biggest issues with Web 2.0 were always economic in nature.</p>

      <p>Netflix, Amazon and Apple are continuing to finance what many are calling the <a href='https://en.wikipedia.org/wiki/Golden_Age_of_Television_(2000s%E2%80%93present)'>Golden Age of Television</a>, represented by big budget creations made through a pre-existing and historical model of cultural production. The Hollywood Studio system, its guilds and complex accounting, remains fully functional. Financing for the creation and distribution of copyrighted works and other forms of intellectual property are important parts of what keeps their industries productive and functional, even as they deal with the weight of collective bargaining and stardom.
      </p>

      <p>Tyler Cowen, in his work <a href='http://www.amazon.com/gp/product/0674001885?ie=UTF8&tag=marginalrevol-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0674001885'>In Praise of Commercial Culture</a>, takes an optimistic approach to the market production of art, and demonstrates how individual rights to intellectual property like copyright have worked for industries and artists alike. This upbeat approach seems like a needed addition to our increasingly cloudy perspectives on digital media ownership.</p>

      <p>It is hardly fair to call the media landscape of Web 2016 a sort of <a href='http://cyberlaw.stanford.edu/events/digital-feudalism-upon-us-how-do-we-respond'>feudalism</a>, "with a small number of companies controlling their respective non-interoperable digital territories" and users conceptualized as serfs, even though analogies to <a href='http://motherboard.vice.com/read/dead-myspace-content-farms-time-inc'>content farms</a> are apt. Feudalism implies a lack of choice on behalf of the participants. But, just as <a href='http://marginalrevolution.com/marginalrevolution/2007/05/no_one_makes_yo.html'>No One Forces You To Shop at Wal-Mart</a>, no one forces you to use Facebook. Yet for those either on the inside or outside of Web 2016 who yearn for the optimism of our very recent past, the future is starting to look pretty grim.</p>

      <p>Ironically and unfortunately, this pessimism seems to find in copyright a cause of the problems it laments, rather than a potential source of their relief. The abuses that have come to be associated with the Web 2.0 aversion to corporate-centric copyright belie underlying protections that we sometimes take for granted. There's a danger that this pessimism could turn people against <a href='http://www.wsj.com/articles/peter-thiel-competition-is-for-losers-1410535536'>decentralized</a>, <a href='http://recode.net/2016/02/09/marc-andreessen-offends-india-defending-facebooks-free-basics-yes-the-country/'>equal-access</a>, and <a href='http://www.cato-unbound.org/2009/04/13/peter-thiel/education-libertarian'>democratic</a> models of production with a return of language related to <a href='http://paulgraham.com/ineq.html'>uneven</a> and <a href='http://recode.net/2014/01/25/kleiner-perkins-founder-alienates-with-holocaust-analogies-in-op-ed/'>confrontational</a> relationships between consumers, producers and financiers.</p>

      <p>My colleagues and I at Blockai believe that <b>our future is bright and we see a lot of room for continued innovation</b> in the creation, distribution and professional production of digital media, from film, music and long-form articles to new digital art forms like gifs, games and memes, <b>but only if we embrace author-centric notions of digital copyright</b>. We want to ensure for the Web a voluntary and decentralized solution for such copyright. We want to make sure that the egalitarian and public access nature of the Web remains healthy and intact. That's why we developed the Open Publish protocol.</p>

      <p>Open Publish is an open source and equal-access copyright registration and digital rights management system built on top of the Bitcoin blockchain. Our commercial Blockai product is built directly on top of Open Publish, which allows us to maintain an unprivileged position, guaranteeing a fundamentally open and public system. Our tools enable users to register their digital products in the blockchain, so that they can attain permanent, unambiguous and distributed proof of ownership of their intellectual property. If, in the future, Blockai decides to build different products unrelated to Open Publish, the blockchain remains, along with all associated claims of ownership.</p>

      <p>For more details, please check out the <a href='https://github.com/blockai/openpublish'>Open Publish</a> and <a href='https://github.com/blockai/openpublish-state-engine'>Open Publish State Engine</a> repositories on GitHub.</p>

      <p>Copyright, in its essence, is a very simple concept. Individuals are given the exclusive legal rights to their creative works. These rights, amongst other things, protect their financial interests. An author is guaranteed some or all of the profits made by others from their works. This means that if you write something and then someone else prints out and sells 10,000 copies, you are entitled to those profits.</p>

      <p>When copyright was first enacted in the United States by the <a href='https://en.wikipedia.org/wiki/Copyright_Act_of_1790'>Copyright Act of 1790</a>, an individual author was granted two 14-year terms. If a new author made a bad deal and sold their copyright for a small sum to someone who made a fortune, this original term would expire after 14 years, allowing for the author to re-register and presumably negotiate a better deal. In order to receive these copyright protections a work was required to be registered and a copy delivered to a repository such as the Library of Congress. The reason for this was that publishers and printers needed a way to check and verify the legal status of an authored work, to avoid any legal repercussions for infringement. After 28 years the work entered into the public domain and the original author could make no further claims to profits. <b>Copyright initially aimed to be a reasonable balance between private individual rights and the public good</b>.</p>

      <p>Copyright law in the United States has changed drastically since the late 18th century. The terms have ballooned and <b>there is now an explicit difference between individual authorship and corporate authorship</b>. Individuals are now granted a lifetime term plus an additional 70 years before their property reverts to the public domain. Corporations are granted a 120 year term after creation or 95 years after publication. <b>These changes are detrimental to both the public commons as well as individual authors</b>, as the changes primarily favor corporations.</p>

      <p>In the 1970s, the Library was <b>so overwhelmed that it abdicated its position as central registry</b>. Registration with the Library was supplanted as the basis of ownership by the concept of Proof of Publication – to be determined by the courts once a claim to infringement has been opened. This, however, is <b>costly</b> beyond the resources of your typical culture-producing individual. The registration process is still functional although <b>frequently backlogged</b> for months at a time. </p>

      <p>With Open Publish we believe we have found a solution to the financial barrier for claiming one's right to one's intellectual property. Since the blockchain is a centralized but distributed registry, it can be recognized by the courts as <b>proof of publication</b>. At the same time, registration with Open Publish is both <b>cheap and quick</b>. Moreover, it is searchable, so that anyone can quite simply and unambiguously ascertain who owns a particular digital asset. This is important because, <b>in a knowledge economy, the products of your intellect ought to be recognized for what they are: assets</b>. Tradeable, fungible, assets.</p>

      <p>By utilizing the blockchain we can <b>return the idea of a centralized registry</b> to the protections of copyright, while simplifying the process and making it available to anyone with an interest in maintaining ownership of the digital stuff they create and propagate on the Web. In this way our solution upholds the commitment to <b>egalitarian, public access</b> that underlied Web 2.0 in its original formulation, while providing an essential 'who-owns-what' registry that has never existed for digital property. And we've done this by harnessing the unique qualities of the Bitcoin blockchain – its unrivalled and truly innovative system for obtaining distributed consensus.</p>

      <p>The problem isn't that the web is too commercial, it's that <b>commerce on the web lacks the intellectual property protections</b> so important to pre-Internet commerce. This privileges certain interests at the expense of others. The irony is that we are still guaranteed these fundamental rights to commercial copyright protections, and that these same protections have always underwritten the financial and legal mechanics that allow for the Web to exist in the first place. We need to bring the commercial life of the Web into alignment with the commercial life that allows for the Web.</p>

      <p>We've seen some incredible innovations but we really can do so much more. Kickstarter, IndieGogo, Patreon and a number of other Web 2.0 companies have shown the way forward for <b>decentralized financing of commercial digital media production</b>. We need to retain the fan support but add a notion of <b>asset ownership</b>. This will allow for Kickstarter and Patreon-like systems that support dedicated support networks of publishers and labels. Fans could possibly <b>share in the financial growth</b> of their favorite authors and artists while continuing to help pay for and cover the risks associated with creating digital media.</p>

      <p>We need help building <b>open platform</b> versions of Spotify that use Open Publish. We need help building <b>open platform</b> versions of Kickstarter and Patreon that use Open Publish. By using Open Publish to bind the contracts between audiences on Spotify-like systems and fans and investors on Kickstarter-like systems, we can develop <b>amazing new ways to create and to share</b>! Web 2016 is the realization that we need to <b>share in the free exchange of each other's wealth</b>, not just in the free exchange of each other's ideas.</p>

      <p>We're not stuck with a pessimistic view of Web 2016. Next year we get Web 2017, and the following year, Web 2018. We have a lot of great things to look forward to!</p>

      <p><Button bsStyle='primary'>Register Your Digital Works Today!</Button></p>

    </Article>
  }
}

module.exports = IntroToExpect
