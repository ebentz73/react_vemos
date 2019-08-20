import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { isSameDay } from '@utils/datetime';

const TODAY = moment();
const TOMORROW = moment().add(1, 'day');

// today, yesterday, last 7 days, last 30 days, this month, last month, custom date range
const PRESETS = [
  {
    text: 'Today',
    start: TODAY,
    end: TODAY
  },
  {
    text: 'Tomorrow',
    start: TOMORROW,
    end: TOMORROW
  },
  {
    text: 'Last 7 Days',
    start: moment().subtract(6, 'days'),
    end: TODAY
  },
  {
    text: 'Last 30 Days',
    start: moment().subtract(30, 'days'),
    end: TODAY
  },
  {
    text: 'This Month',
    start: moment().startOf('month'),
    end: TODAY
  },
  {
    text: 'Last Month',
    start: moment()
      .subtract(1, 'month')
      .startOf('month'),
    end: moment()
      .subtract(1, 'month')
      .endOf('month')
  }
];

class DateRangeFilter extends Component {
  static propTypes = {
    value: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    label: '',
    value: [],
    onChange: () => undefined
  };

  constructor() {
    super();
    this.state = {
      focusedInput: null
    };
  }

  onChangeFocusedInput = focusedInput => {
    this.setState({ focusedInput });
  };

  renderDatePresets = () => {
    const { onChange, value } = this.props;
    const [startDate, endDate] = value;

    return (
      <Box px={2} py={3} display="flex">
        {PRESETS.map(preset => {
          const isSelected =
            isSameDay(preset.start, startDate) &&
            isSameDay(preset.end, endDate);
          return (
            <Box
              key={preset.text}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <Button
                variant={isSelected ? 'contained' : 'text'}
                color={isSelected ? 'primary' : 'default'}
                onClick={() => onChange([preset.start, preset.end])}
              >
                {preset.text}
              </Button>
            </Box>
          );
        })}
      </Box>
    );
  };

  render() {
    const { focusedInput } = this.state;
    const { value, label, onChange } = this.props;

    return (
      <Box>
        <FormLabel>{label}</FormLabel>
        <FormGroup row>
          <DateRangePicker
            startDate={value[0] ? moment(value[0]) : null}
            startDateId="start-date-filter"
            endDate={value[1] ? moment(value[1]) : null}
            endDateId="end-date-filter"
            onDatesChange={({ startDate, endDate }) => {
              onChange([
                startDate ? startDate.format() : null,
                endDate ? endDate.format() : null
              ]);
            }}
            initialVisibleMonth={() => moment().subtract(1, 'month')}
            block
            hideKeyboardShortcutsPanel={true}
            customArrowIcon={<span>TO</span>}
            minimumNights={0}
            noBorder={true}
            enableOutsideDays={false}
            renderCalendarInfo={this.renderDatePresets}
            isDayBlocked={() => false}
            isOutsideRange={() => false}
            isDayHighlighted={() => false}
            focusedInput={focusedInput}
            onFocusChange={this.onChangeFocusedInput}
          />
        </FormGroup>
      </Box>
    );
  }
}

export default DateRangeFilter;
