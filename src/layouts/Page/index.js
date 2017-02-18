import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import Gallery from "react-grid-gallery"
import { Timeline } from "react-twitter-widgets"
import { Line } from "react-chartjs"
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
    ['26/1/17', 2],
    ['27/1/17', 2],
    ['28/1/17', 2],
    ['29/1/17', 4],
    ['30/1/17', 6],
    ['31/1/17', 4],
    ['1/2/17', 0],
    ['2/2/17', 0],
    ['3/2/17', 0],
    ['4/2/17', 0],
    ['5/2/17', 0],
    ['6/2/17', 2],
    ['7/2/17', 2],
    ['8/2/17', 3],
    ['9/2/17', 0],
    ['10/2/17', 2],
    ['11/2/17', 2],
    ['12/2/17', 0],
    ['13/2/17', 6],
    ['14/2/17', 8],
    ['15/2/17', 3],
    ['16/2/17', 2],
    ['17/2/17', 0],
    ['18/2/17', 0],
  ]

  const addDrawings = (accumulator, datapoint) => {
    return accumulator + datapoint[1]
  }
  const yData = drawingData.map((datapoint)=>{return datapoint[0]})
  const drawingsDoneToDate = drawingData.map((datapoint, index)=>{
    return drawingData
      .slice(0, index + 1)
      .reduce(addDrawings, 0)
  })

  const chartData = {
    yLabels: ["drawings collected"],
    labels: yData,
    datasets: [
      {
        label: "# drawings",
        fillColor: "rgba(52,166,95,0.2)",
        strokeColor: "#34A65F",
        pointColor: "#34A65F",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: drawingsDoneToDate
      }
    ]
  }

  const chartOptions = {
    animate: true,
    responsive: true
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
        <Gallery images={IMAGES}/>
        <br/><br/>
        <Line data={chartData} options={chartOptions} height="250"/>
        <br/><br/>
        <div style={{maxWidth: 600, flex: 1, justifyContent: 'center'}}>
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'drawninnz'
            }}
            options={{
              username: 'drawninnz',
              height: '1200'
            }}
            onLoad={() => { }}
            style={{flex: 1}}
          />
        </div>
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
