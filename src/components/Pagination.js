import React, { Component, Fragment } from 'react';

export default class Pagination extends Component {
  const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

  this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
  this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

  this.pageNeighbours = typeof pageNeighbours === 'number'
    ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;

  this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

  this.state = { currentPage: 1 };
};