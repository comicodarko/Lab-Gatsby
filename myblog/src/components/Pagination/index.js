import React from 'react';
import propTypes from 'prop-types';

import * as S from './styled'
import { KeyboardArrowLeft as ArrowLeft } from '@styled-icons/material-rounded/KeyboardArrowLeft';
import { KeyboardArrowRight as ArrowRight } from '@styled-icons/material-rounded/KeyboardArrowRight';

const Pagination = ({ isFirst, isLast, currentPage, numPages, prevPage, nextPage }) => {
  return (
    <S.PaginationWrapper>
      {!isFirst && 
        <S.PaginationLink to={prevPage}>
          <ArrowLeft style={{width: 25}}/> Página Anterior
        </S.PaginationLink>
      }

      <p>{currentPage} de {numPages}</p>

      {!isLast &&
        <S.PaginationLink to={nextPage}>
          Próxima Página <ArrowRight style={{width: 25}}/>
        </S.PaginationLink>
      } 
    </S.PaginationWrapper>
  )

  Pagination.propTypes = {
    isFirst: propTypes.bool.isRequired,
    isLast: propTypes.bool.isRequired,
    currentPage: propTypes.number.isRequired,
    numPages: propTypes.number.isRequired,
    prevPage: propTypes.string,
    nextPage: propTypes.string,
  }
}

export default Pagination;