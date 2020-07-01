import styled from 'styled-components';
import { Link } from 'gatsby';

export const MenuLinksWrapper = styled.nav``

export const MenuLinksList = styled.ul`
  font-size: 1.2rem;
  font-weight: 300;
`

export const MenuLinksItem = styled.li`
  padding: .5rem 0;

  .active {
    color: #0DD3BA;
  }
`

export const MenuLinksLink = styled(Link)`
  color: #A7BCCC;
  text-decoration: none;
  transition: color 0.5s;

  &:hover {
    color: #0DD3BA
  }
`