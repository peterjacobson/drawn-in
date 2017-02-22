import React from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"
import ReactGA from "react-ga"

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Post from "./layouts/Post"

ReactGA.initialize('UA-72072231-2')

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Page,
      PageError,
      Homepage,
      Post,
    }}
  />
)

function logPageView() {
  // ReactGA.set({ page: window.location.pathname });
  // ReactGA.pageview(window.location.pathname);
}

export default (
  <Route component={ AppContainer }>
    <Route path="*" component={ PageContainer } onUpdate={logPageView}/>
  </Route>
)
