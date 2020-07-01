import styled from 'styled-components';
import { Link } from 'gatsby';

export const MenuBarWrapper = styled.aside`
  align-items: center;
  background: #16203C;
  border-left: 1px solid #38444d;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding: 0.5rem 0;
  position: fixed;
  right: 0;
  width: 3.75rem;
`

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuBarLink = styled(Link)`
  display: block;
`

export const MenuBarItem = styled.span`
  color: #A7BCCC;
  cursor: pointer;
  display: block;
  height: 1.5rem;
  width: 1.5rem;
  padding: 1.1rem;
  position: relative;

  &:hover {
    color: #0DD3BA;
  }
`