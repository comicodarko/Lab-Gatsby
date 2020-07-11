import React from 'react';
import { graphql } from 'gatsby';

import Layout from "../components/Layout";
import RecommendedPosts from "../components/RecommendedPosts";
import Comments from "../components/Comments";
import SEO from "../components/seo";

import * as S from "../components/Post/styled";

export const query = graphql`
  query Post($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    fields {
      slug
    }
    frontmatter {
      title
      description
      date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
    }
    html
    timeToRead
  }
}

`

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const next = pageContext.previousPost
  const previous = pageContext.nextPost

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <S.PostHeader>
        <S.PostDate>
          {post.frontmatter.date} • {post.timeToRead} min de leitura
        </S.PostDate>
        <S.PostTitle>{post.frontmatter.title}</S.PostTitle>
        <S.PostDescription>{post.frontmatter.description}</S.PostDescription>
      </S.PostHeader>
      <S.MainContent> 
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </S.MainContent>
      <RecommendedPosts next={next} previous={previous}/>
      <Comments url={post.fields.slug} tittle={post.frontmatter.title} />
    </Layout>
  )

}


export default BlogPost;