import styled from 'styled-components';

export const SocialLinksWrapper = styled.nav`
  margin: 2rem auto;
  width: 100%;
`

export const SocialLinksList = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
`

export const SocialLinksItem = styled.li``

export const SocialLinksLink = styled.a`
  color: #A7BCCC;
  text-decoration: none;
  transition: color 0.5s;

  &:hover {
    color: #0DD3BA;
  }
`

export const IconWrapper = styled.div`
  fill: #bbb;
  width: 40px;
  height: 40px;
`