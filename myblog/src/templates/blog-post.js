import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export const query = graphql`
  query Post($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
    }
    html
  }
}

`

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  )

}


export default BlogPost;