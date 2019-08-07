import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from '@containers/layout/Page';
import TranasctionTable from '@containers/transactions/TransactionTable';
import TransactionActions from '@redux/TransactionRedux';

TransactionPage.propTypes = {
  loadTransactions: PropTypes.func
};

function TransactionPage({ loadTransactions }) {
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Page title="Transactions">
      <TranasctionTable />
    </Page>
  );
}

const mapDispatchToProps = dispatch => ({
  loadTransactions: () => dispatch(TransactionActions.loadTransactions())
});

export default connect(
  null,
  mapDispatchToProps
)(TransactionPage);
