// @ts-check
const tableData = require('./output.json');

var table = new Tabulator('#table-container', {
  data: tableData.data, //load row data from array
  layout: 'fitColumns', //fit columns to width of table
  responsiveLayout: 'hide', //hide columns that dont fit on the table
  tooltips: true, //show tool tips on cells
  addRowPos: 'top', //when adding a new row, add it to the top of the table
  history: true, //allow undo and redo actions on the table
  pagination: 'local', //paginate the data
  paginationSize: 50, //allow 7 rows per page of data
  movableColumns: true, //allow column order to be changed
  resizableRows: true, //allow row order to be changed
  initialSort: [
    //set the initial sort order of the data
    { column: 'imdbRating', dir: 'dec' },
  ],
  columns: [
    {
      title: 'Title',
      field: 'Title',
    },
    {
      title: 'IMDB Rating',
      field: 'imdbRating',
    },
    {
      title: 'IMDB Votes',
      field: 'imdbVotes',
    },
    {
      title: 'IMDB Link',
      field: 'imdbID',
    },
    {
      title: 'Plot',
      field: 'Plot',
      width: '60%',
    },
  ],
});
