import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { AppSelectors } from '@redux/AppRedux';
import { AuthSelectors } from '@redux/AuthRedux';
import PosDetail from './PosDetail';
import GeneralAdmissionDetail from './GeneralAdmissionDetail';
import GuestListDetail from './GuestListDetail';
import TicketDetail from './TicketDetail';

ExpandableRow.propTypes = {
  transaction: PropTypes.object,
  rowData: PropTypes.array,
  venueId: PropTypes.string,
  endOfNight: PropTypes.string
};

const DETAIL_MAP = {
  pos: PosDetail,
  ga: GeneralAdmissionDetail,
  gl: GuestListDetail,
  ticket: TicketDetail
};

function ExpandableRow({ rowData, transaction, venueId, endOfNight }) {
  const colSpan = rowData.length + 1;
  const Detail = DETAIL_MAP[transaction.transaction_type];

  return (
    <TableRow>
      <Box component={TableCell} colSpan={colSpan} bgcolor="background.default">
        <Box component={Paper} p={2}>
          <Detail
            transaction={transaction}
            venueId={venueId}
            endOfNight={endOfNight}
          />
        </Box>
      </Box>
    </TableRow>
  );
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state),
  endOfNight: AppSelectors.selectEndOfNight(state)
});

export default connect(mapStatesToProps)(ExpandableRow);
