import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import Gallery from "react-grid-gallery"
import { Timeline } from "react-twitter-widgets"
import { LineChart } from "react-chartjs"
import warning from "warning"
import { BodyContainer, joinUri, Link } from "phenomic"

import Button from "../../components/Button"
import Loading from "../../components/Loading"

import styles from "./index.css"

const Page = (
  {
    isLoading,
    __filename,
    __url,
    head,
    body,
    header,
    footer,
    children,
  },
  {
    metadata: { pkg },
  }
) => {
  warning(
    typeof head.title === "string",
    `Your page '${ __filename }' needs a title`
  )

  const metaTitle = head.metaTitle ? head.metaTitle : head.title

  const socialImage = head.hero && head.hero.match("://") ? head.hero
    : joinUri(process.env.PHENOMIC_USER_URL, head.hero)

  const meta = [
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:image", content: socialImage },
    { property: "og:description", content: head.description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "twitter:image", content: socialImage },
    { name: "description", content: head.description },
  ]

  const IMAGES = [
    {
      src: 'assets/drawings/IMG_20170204_134259.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134259.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134333.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134333.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134351.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134351.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134403.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134403.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134415.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134415.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134432.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134432.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134445.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134445.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134453.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134453.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134516.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134516.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134529.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134529.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134554.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134554.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134651.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134651.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134714.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134714.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134724.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134724.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134739.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134739.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134750.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134750.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134756.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134756.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134813.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134813.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134831.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134831.jpg'
    },
    {
      src: 'assets/drawings/IMG_20170204_134843.jpg',
      thumbnail: 'assets/drawings/IMG_20170204_134843.jpg'
    }
  ]

  // http://www.chartjs.org/docs/#line-chart-dataset-structure

  const drawingData = [
    ['1/2/17', 4]
    ['2/2/17', 5]
    ['4/2/17', 6]

  ]

  const chartData = {
    labels: []
    datasets: [
      {
        label: "# drawings",
        data: drawingData.map
      }
    ]
  } 

  return (
    <div className={ styles.page }>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      {
        <div
          className={ styles.hero }
          style={ head.hero && {
            background: `#111 url(${ head.hero }) 50% 50% / cover`,
          } }
        >
          <div className={ styles.header }>
            <div className={ styles.wrapper }>
              <h1 className={ styles.heading }>{  }</h1>
              {
                head.cta &&
                <Link to={ head.cta.link }>
                  <Button className={ styles.cta } light { ...head.cta.props }>
                    { head.cta.label }
                  </Button>
                </Link>
              }
            </div>
          </div>
        </div>
      }
      <div className={ styles.wrapper + " " + styles.pageContent }>
        { header }
        <div className={ styles.body }>
          {
            isLoading
            ? <Loading />
            : <BodyContainer>{ body }</BodyContainer>
          }
        </div>
        <LineChart data={chartData} options={chartOptions} width="600" height="250"/>        
        <Gallery images={IMAGES}/>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'drawninnz'
          }}
          options={{
            username: 'drawninnz',
            height: '1200'
          }}
          onLoad={() => console.log('Timeline is loaded!')}
        />
        { children }
        { footer }
      </div>
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page
