import styled from 'styled-components'
import { Link } from 'gatsby'

export const RecommendedWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`

export const RecommendedLink = styled(Link)`
  align-items: center;
  background: #16203C;
  color: #0DD3BA;
  display: flex;
  padding: 1.9rem;
  padding-top: 2.25rem;
  text-decoration: none;
  border: 1px solid #38444d;
  transition: 0.5s;
  width: 40%;
  &:hover {
    background: #141433;
    border-color: #0DD3BA;
  }
  &.next {
    justify-content: flex-end;
  }
  &.previous:before {
    content: "\\2190";
    margin-right: 0.5rem;
  }
  &.next:after {
    content: "\\2192";
    margin-left: 0.5rem;
  }
`