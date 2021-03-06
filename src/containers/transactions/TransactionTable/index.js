import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import TransactionActions, {
  TransactionSelectors
} from '@redux/TransactionRedux';
import logger from '@utils/logger';
import { getQuery } from '@utils/history';
import ExpandableRow from './ExpandableRow';
import COLUMNS from './columns';

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  count: PropTypes.number,
  filterOptions: PropTypes.object,
  loadTransactions: PropTypes.func,
  setTransactionFilter: PropTypes.func,
  setTransactionSorts: PropTypes.func,
  setTransactionDisplay: PropTypes.func,
  setTransactionPagination: PropTypes.func
};

function TransactionTable({
  transactions,
  setTransactionDisplay,
  setTransactionFilter,
  setTransactionSorts,
  setTransactionPagination,
  filterOptions,
  loadTransactions,
  count
}) {
  useEffect(() => {
    const query = getQuery();
    const start = get(query, 'filters.start');
    const end = get(query, 'filters.end');

    if (start || end) {
      setTransactionFilter({
        timestamp: [
          start ? moment(start).format() : null,
          end ? moment(end).format() : null
        ]
      });
    }
  }, []);

  const handleTableChange = (action, options) => {
    logger.debug('Transaction Table Change:', action, options);

    switch (action) {
      case 'sort': {
        const sorts = options.columns
          .filter(c => c.sortDirection)
          .reduce(
            (prev, current) => ({
              ...prev,
              [current.name]: current.sortDirection
            }),
            {}
          );
        setTransactionSorts(sorts);
        break;
      }
      case 'columnViewChange': {
        const display = options.columns
          .filter(c => c.display)
          .reduce(
            (prev, current) => ({
              ...prev,
              [current.name]: current.display
            }),
            {}
          );
        setTransactionDisplay(display);
        break;
      }
      case 'changeRowsPerPage':
      case 'changePage':
        setTransactionPagination(options.page, options.rowsPerPage);
        break;
      case 'resetFilters':
      case 'filterChange':
        setTransactionFilter(
          options.filterList.reduce(
            (prev, current, index) => ({
              ...prev,
              [options.columns[index].name]:
                current && current.filter(f => f).length ? current : []
            }),
            {}
          )
        );
        break;
      default:
        return;
    }

    loadTransactions();
  };

  const handleFilterChange = changedCol => {
    setTransactionDisplay({
      ...filterOptions.display,
      [changedCol]: true
    });
  };

  const TABLE_OPTIONS = {
    count,
    page: filterOptions.page,
    rowsPerPage: filterOptions.rowsPerPage,
    selectableRows: 'none',
    filter: true,
    serverSide: true,
    filterType: 'dropdown',
    responsive: 'stacked',
    search: false,
    print: false,
    download: false,
    expandableRows: true,
    expandableRowsOnClick: true,
    rowsPerPageOptions: [10, 25, 50],
    renderExpandableRow: (rowData, rowMeta) => (
      <ExpandableRow
        rowData={rowData}
        rowMeta={rowMeta}
        transaction={transactions[rowMeta.dataIndex]}
      />
    ),
    onFilterChange: handleFilterChange, // only used for displaying filtered col
    onTableChange: handleTableChange
  };

  const TABLE_COLUMNS = COLUMNS.map(c => ({
    ...c,
    options: {
      ...c.options,
      display: filterOptions.display[c.name],
      filterList: filterOptions.filters[c.name] || [],
      sortDirection: filterOptions.sorts[c.name]
    }
  }));

  return (
    <MUIDataTable
      data={transactions}
      columns={TABLE_COLUMNS}
      options={TABLE_OPTIONS}
    />
  );
}

const mapStatesToProps = state => ({
  transactions: TransactionSelectors.selectTransactions(state),
  count: TransactionSelectors.selectCount(state),
  filterOptions: TransactionSelectors.selectTransactionOptions(state)
});

const mapDispatchToProps = dispatch => ({
  setTransactionDisplay: display =>
    dispatch(TransactionActions.setTransactionDisplay(display)),
  setTransactionSorts: sorts =>
    dispatch(TransactionActions.setTransactionSorts(sorts)),
  setTransactionFilter: filter =>
    dispatch(TransactionActions.setTransactionFilter(filter)),
  setTransactionPagination: (page, rowsPerPage) =>
    dispatch(TransactionActions.setTransactionPagination(page, rowsPerPage)),
  loadTransactions: () => dispatch(TransactionActions.loadTransactions())
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(TransactionTable);
