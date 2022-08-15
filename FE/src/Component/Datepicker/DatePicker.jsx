import React from "react";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker-edited";
import moment from "moment";


import { Button } from "react-bootstrap";

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentEl: "#demo",
      opens: "left",
      startDate: moment().subtract(29, "days"),
      endDate: moment(),
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment(), moment().add(6, "days")],
        "Last 30 Days": [moment(), moment().add(29, "days")],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
            moment()
              .subtract(1, "month")
              .startOf("month"),
            moment()
              .subtract(1, "month")
              .endOf("month")
        ]
      }
    };
    this.handleApply = this.handleApply.bind(this);
  }

  locale = {
    format: "DD-MM-YYYY",
    separator: " - ",
    applyLabel: "Apply",
    cancelLabel: "Сancel",
    weekLabel: "Н",
    customRangeLabel: "Custom Range",
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
  };

  handleApply(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  }

  callback = value => {
    console.log(value);
  };

  render() {
    const { ranges, startDate, endDate } = this.state;
    const start = startDate.format("DD-MM-YYYY");
    const end = endDate.format("DD-MM-YYYY");
    let label = `${start} - ${end}`;
    if (start === end) {
      label = start;
    }

    return (
      <div className="form-group">
        <div >
          <DatetimeRangePicker
            startDate={startDate}
            endDate={endDate}
            ranges={ranges}
            locale={this.locale}
            onApply={this.handleApply}>
            <div className="input-group">
              <input type="text" className="form-control" value={label} readOnly />
              <span className="input-group-btn">
                <Button className="default date-range-toggle">
                  <i className="fa fa-calendar" />
                </Button>
              </span>
            </div>
          </DatetimeRangePicker>
        </div>
      </div>
    );
  }
}

export default DateRangePicker;
