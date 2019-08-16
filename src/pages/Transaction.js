import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { StatItem } from '@components/dashboard';
import Page from '@containers/layout/Page';
import TranasctionTable from '@containers/transactions/TransactionTable';
import { getPrice } from '@utils/currency';
import TransactionActions, {
  TransactionSelectors
} from '@redux/TransactionRedux';

TransactionPage.propTypes = {
  loadTransactions: PropTypes.func,
  count: PropTypes.number,
  stats: PropTypes.object
};

function TransactionPage({ loadTransactions, stats, count }) {
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Page title="Transactions">
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs>
            <StatItem label="Total Sales" value={getPrice(stats.total)} />
          </Grid>
          <Grid item xs>
            <StatItem label="Cash Sales" value={getPrice(stats.cashTotal)} />
          </Grid>
          <Grid item xs>
            <StatItem
              label="Credit Sales"
              value={getPrice(stats.creditTotal)}
            />
          </Grid>
          <Grid item xs>
            <StatItem
              label="Comps"
              value={`${stats.compedCount} (${getPrice(stats.compedTotal)})`}
            />
          </Grid>
          <Grid item xs>
            <StatItem label="Transactions" value={count} />
          </Grid>
        </Grid>
      </Box>
      <TranasctionTable />
    </Page>
  );
}

const mapStatesToProps = state => ({
  stats: TransactionSelectors.selectStats(state),
  count: TransactionSelectors.selectCount(state)
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: () => dispatch(TransactionActions.loadTransactions())
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(TransactionPage);
