'use strict'

var React = require('react')
var ReactBootstrap = require('react-bootstrap')
var Table = ReactBootstrap.Table
var Article = require('./article.jsx')

class IntroToExpect extends React.Component {
  render () {
    return <Article title='From Web 2.0 to Web 2016' >
      <h3>The Changing Landscape of Digital Cultural Production and why we need Public Platforms for Digital Ownership</h3>

      <p>As the social media- and smartphone-fueled <a href='http://techcrunch.com/2016/02/28/even-peter-thiel-has-got-soul/'>gold rush comes to an end</a>, and a few corporations continue to entrench their positions, <b>we are beginning to see the dominance of modes of cultural production that differ substantially from those heralded at the outset of Web 2.0</b>. Commercial activity is big business in Web 2016, with Charlie Bit My Finger replaced by Gangnam Style. While a few new professions were born during the last decade, what really defines today's media landscape is the inclusion of a large number of existing corporate-sponsored professions in to the cultural production of the Web. Hollywood has stayed in business and <b>now there is once again an eager public with open wallets willing to pay for the production of professional content that is featured on the Web</b>.</p>

      <p>It is wonderful to see cultural production happen in a way that supports the livelihoods of those who produce it. The productions themselves are wonderful to consume, since it is well-made. However, the return of 20th century modes of production has also seen a return of hierarchical media relationships and opaque business arrangements. No one knows how the money flows around Spotify and no one knows the ranking algoritms on Facebook.</p>

      <p>The Internet still offers us ways to maintain the <b>voluntary, decentralized and democratic energies of Web 2.0</b>. One way to avoid such a return to corporatist copyright would be to develop, for the web, the original, author-centered notions of copyright that are both the hope of the web masses and their legal right.</p>

      <p>Blockai has developed an open-source and open-data protocol called <a href='https://github.com/blockai/openpublish'>Open Publish</a> which allows for people to <b>register digital assets that represent claims of ownership over digital media</b>. We've turned the Open Publish registration process in to a product that <a href='https://www.blockai.com'>you can try out for yourself</a> We think that Blockai and Open Publish have what it takes to release <a>The Dormant Value of Digital Cutural Production</a>.</p>

      <p>There's no better way to define Web 2.0 than by the <a href='https://en.wikipedia.org/wiki/Web_2.0'>definition of Web 2.0 on Wikipedia</a>. Web 2.0 mainly defines itself in relation to Web 1.0, and I'd like to define Web 2016 along a similar trajectory.</p>

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
        <li>Folksonomy is replaced by <b>third-party editorial algorithms</b>. Professional editorship never went away. We're still tuning in to Fox News, ESPN, and Chelsea Handler and reading them online, even if they are now using information technology to assist in the editorial process. Facebook uses algorithmic filters to provide a better experience.</li>
        <li>Rich User Experience is replaced with a <b>poor user experience</b>, with bloated web pages full of advertisements, paywalls, and ad blocking wars. The need for artificial scarcity to create the market conditions for an information economy never went away.</li>
        <li>User Participation is replaced <b>small number of professional producers</b> and large number of consumers. Mass Media never went away. People continue to appreciate the relationship between stage and audience, writer and reader.</li>
        <li>Software as a service turned in to <b>restricted API access</b>. Twitter has long since abandoned the grassroots network of clients and has added many restrictions to it's API. Subscription data services never went away. Bloomberg continues to sell professional terminals, and Getty continues to sell professional photographs.</li>
        <li>Mass Participation is replaced by <b>private, limited web access</b>, such as Free Basics, which leads to limited choice. The private relationships between self-interested publishers and distributors never went away. Sony and Spotify are engaged in opqaue business deals.</li>
      </ol>

      <p>The issues with poor user experiences are being solved in a number of different ways by different companies. Apple and Google both allow for <b>third-party adblocking</b> software to run on all of their devices in order to provide a better user experience. Facebook with Instant Articles and Google with AMP are both attempting to reduce the weight of advertisements in mobile content through <b>revenue sharing</b> programs. That private companies could or should opaquely control the entire commercial marketplace of the Web has <a href='http://recode.net/2016/02/24/google-amp-is-less-about-beating-facebook-at-news-more-about-gobbling-up-the-mobile-web/'>people worried</a>.</p>

      <p>If Web 2.0 is the optimism of <a href='http://www.shirky.com/weblog/2010/04/the-collapse-of-complex-business-models/'>Clay Shirky</a>, Web 2016 exemplified by the bitterness and pessimism of outsiders like <a href='http://motherboard.vice.com/read/its-2016-and-the-promise-of-the-internet-is-dead'>Carles</a> and <a href='http://tomslee.net/2016/02/whats-yours-is-mine-reviews-and-other-coverage.html'>Tom Slee</a> and insiders like <a href='http://paulgraham.com/re.html'>Paul Graham</a> and <a href='https://medium.com/@ev/maturing-markets-higher-stakes-closing-doors-ae69da6c764#.qffjsv2cb'>Ev Williams</a>.</p>

      <p>Whereas previous critique of Web 2.0 has focused on the aesthetic and moral values of cultural production, exemplified by works such as <a href='https://en.wikipedia.org/wiki/The_Cult_of_the_Amateur'>The Cult of the Amateur</a> by Andrew Keen, contemporary critique of the Web 2016 modes of production are financial and political in nature, like <a href='https://en.wikipedia.org/wiki/The_People%27s_Platform:_Taking_Back_Power_and_Culture_in_the_Digital_Age'>The People's Platform</a> by Astra Taylor. These critiques reflect the dynamic shift from the aesthetic and moral conditions of Web 2.0 to the financial and political conditions of Web 2016.</p>

      <p>There are many great applications and services from  Web 2.0. Wikipedia, Archive.org, Patreon, Kickstarter and many other services are bearing wonderful fruits and I expect these to continue. Web 2.0 never went away, but the sublte difference is, Hollywood never went away either!</p>

      <p>Netflix, Amazon and Apple are continuing to finance what many are calling the <a href='https://en.wikipedia.org/wiki/Golden_Age_of_Television_(2000s%E2%80%93present)'>Golden Age of Television</a>. These are big budget creations made by a pre-existing and historical mode of cultural production. The Hollywood Studio system, it's guilds and complex accounting, remain fully functional. Financing the creation and distribution of copyrighted works and other forms of intellectual property are important parts of what keeps their industries produtive and functional, even as they deal with the weight of collective bargaining and stardom.</p>

      <p>Tyler Cowen, in his work <a href='http://www.amazon.com/gp/product/0674001885?ie=UTF8&tag=marginalrevol-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0674001885'>In Praise of Commercial Culture</a>, takes an optimistic approach to the market production of art and shows how individual rights to intellectual property have worked for industries and artists alike.</p>

      <p>It is hardly fair to call the media landscape of Web 2016 a sort of <a href='http://cyberlaw.stanford.edu/events/digital-feudalism-upon-us-how-do-we-respond'>feudalism</a>, "with a small number of companies controlling their respective non-interoperable digital territories" and users conceptualized as serfs, even though analogies to <a href='http://motherboard.vice.com/read/the-100-million-content-farm-thats-killing-the-internet'>content farms</a> are apt. Feudalism implied a lack of choice on behalf of the participants. Just as No One Forces You To Shop at Wal-Mart, no one forces you to use Facebook. Yet for those either on the inside or outside of Web 2016 who yearn for the optimism of our very recent past, the future is starting to look pretty grim.</p>

      <p>It's important that we acknowledge that none of this was anyone's fault. Facebook and Twitter were built with the technologies of the time, and at the beginning, were very open with their APIs, sharing in the material wealth of their natural monopolies. Unfortunately technologies like Bitcoin that allow for decentralized digital assets had yet to be discovered.</p>

      <p>Ironically and unfortunately, this pessimism seems to find in copyright a cause of the problems it laments, rather than a potential source of their relief. The corporate abuses that have come to be associated with copyright over the past century belie the underlying protections to digital liberty that we sometimes take for granted. Blockai and Open Publish want to ensure for the Web a voluntary and decentralized solution.</p>

      <p>There's also a danger that this pessimism could turn people against decentralized and democratic models of production with a return of language related to uneven relationships between consumers, producers and financiers. Blockai and Open Publish want to make sure that the egalitarian and public access nature of the Web remains healthy and intact.</p>

      <p>Blockai and Open Publish posit that <b>our future is bright and we see a lot of room for continued innovation</b> in the creation, distribution and professional production of digital media, from film, music and articles to new digital artforms like gifs, games and memes. </p>

      <p>The problem isn't that the web is too commercial, it's that commerce on the web lacks the intellectual property protections so important to pre-Internet commerce. This privileges certain interests at the expense of others. The irony is that we still have these fundamental rights to commercial copyright protections and that these same protections have always underwritten the financial and legal mechanics that allow for the Web to exist in the first place. We need to bring the commercial life of the Web into alignment with the commercial life that allows for the Web.</p>

      <p>We've seen some incredible innovations but we really can do so much more. Kickstarter, IndieGogo, Patreon and a number of other Web 2.0 companies have shown the way forward for <b>decentralized financing of commercial digital media production</b>. We need to retain the fan support but add a notion of <b>asset ownership</b>. This will allow for Kickstarter and Patreon-like systems that support dedicated support networks of publishers and labels. Fans could possibly <b>share in the financial growth</b> of their favorite authors and artists!</p>

      <p>We're not stuck with a pessimistic view of Web 2016. Next year we get Web 2017, and the following year, Web 2018. We have a lot of great things to look forward to! Open Publish is open source. We would love your feedback and help.</p>

      <p>We need help building <b>open platform</b> versions of Spotify that use Open Publish. We need help building <b>open platform</b> versions of Kickstarter and Patreon that use Open Publish. By using Open Publish to bind the contracts between audiences on Spotify-like systems and fans and investors on Kickstarter-like systems, we can develop <b>amazing new ways to create and to share</b>! Web 2016 is the realization that we need to <b>share in the free exchange of each other's wealth</b>, not just in the free exchange of each other's ideas.</p>

      <p>There's no reason why <b>existing industries</b> with organizations like ASCAP, BMI and SESAC, SoundExchange, and TuneCore couldn't <b>embrace these new financial technologies</b> like Open Publish and <b>provide new market oppurtunities</b> for their clients, while still continuing to do business with Spotify, Google, Facebook and Apple, as well as Universal, Sony, and Warners. There's no reason for Universal, Sony and Warners not to explore possible new marketplaces built on Open Publish for their existing intellectual property. There's no reason for companies like Spotify, Kickstarter, Patreon, Google, Facebook and Apple not to use Open Publish to <b>facilitate in equal-access revenue sharing</b>. We're all in the business of producing, selling, and consuming ideas and <b>we all stand to benefit from free and open commerce</b>, corporations and individuals alike.</p>

      <p>Blockai is our commerical product, and we would love to serve you in your needs for <b>registering your digital media with Open Publish</b>! We're setting out to build a public marketplace that needs <b>community support</b> and network effects in order to succeed.</p>

      <p>The first and most important feature is being able to <b>register your work</b>. This gets you immutable proof of publishing by embedding a unique digital media fingerprint in the Bitcoin blockchain signed by a Bitcoin wallet associated with your identity. Think of it like getting a document signed, dated, numbered and notorized. Your registration creates a <b>digital certificate</b> on Blockai's website that you can use as proof for any cases of IP infringement. We've exploring a number of other features, like accepting micropayments, or allowing for you to sell licenses for private and commercial use, interfacing with existing digital media marketplaces, and tracking usage and reach. The first step is building up a large centralized repository of individually owned and controlled digital asset registrations.</p>

      <p>You can of course use Open Pubish to create your own registration software. All Open Publish data is stored directly on the Bitcoin blockchain and Blockai maintains no priviliged position. This means that Open Publish is powered by Bitcoin, You'll need to acquire some of your own Bitcoin in order to use Open Publish directly. There's no such thing as a free lunch! As long as Bitcoin continues to function, Open Publish will retain the underlying public and equal-access consensus making machinery of the blockchain, allowing for a secure, open, public and completely transparent system of private ownership of digital assets.</p>
    </Article>
  }
}

module.exports = IntroToExpect
