import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from '../components/PostItem';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostItem 
      slug="/about"
      background=""
      category="Misc"
      date="1 de Julho de 2020"
      timeToRead="5"
      title="Hello Friend"
      description="Lorem ipsum dolor sit amet."
    />
  </Layout>
)

export default IndexPage
