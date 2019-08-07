import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import TransactionActions, {
  TransactionSelectors
} from '@redux/TransactionRedux';
import logger from '@utils/logger';
import COLUMNS from './columns';

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  count: PropTypes.number,
  filterOptions: PropTypes.object,
  loadTransactions: PropTypes.func,
  setTransactionFilter: PropTypes.func,
  setTransactionSorts: PropTypes.func,
  setTransactionPagination: PropTypes.func
};

// @TODO add filterables
function TransactionTable({
  transactions,
  // setTransactionFilter,
  setTransactionSorts,
  setTransactionPagination,
  filterOptions,
  loadTransactions,
  count
}) {
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
      case 'changeRowsPerPage':
      case 'changePage':
        setTransactionPagination(options.page, options.rowsPerPage);
        break;
      case 'filterChange': // @TODO
        break;
      default:
        return;
    }

    loadTransactions();
  };

  const TABLE_OPTIONS = {
    count,
    page: filterOptions.page,
    rowsPerPage: filterOptions.rowsPerPage,
    filter: true,
    serverSide: true,
    filterType: 'dropdown',
    responsive: 'stacked',
    search: false,
    print: false,
    rowsPerPageOptions: [10, 25, 50],
    onTableChange: handleTableChange
  };

  const TABLE_COLUMNS = COLUMNS.map(c => ({
    ...c,
    options: {
      ...c.options,
      sortDirection: filterOptions.sorts[c.name]
    }
  }));

  return (
    <MUIDataTable
      title="Transactions"
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
