import React, {useState, useEffect} from 'react';
import {DateTimePickerUtility} from '../../Styled/DateSelector.elements';
import {IoCalendarOutline} from 'react-icons/io5';
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";


const DateSelector = ({dateTime, position, readOnly, rf}) => {
  const [value, setValue] = useState(dateTime);

  useEffect(() => {
    setValue(dateTime);
  }, [dateTime])
  

  return (
    <DateTimePickerUtility position={position} Value={value}>
      <i className='icon'><IoCalendarOutline/></i>
        <DatePicker
          ref = {rf}
          readOnly={readOnly}
          value={value} 
          onChange={setValue}
          format="DD/MM/YYYY, hh:mm"
          fixMainPosition="bottom"
          className='calclock'
          plugins={[<TimePicker hideSeconds/>]}
        />
    </DateTimePickerUtility>
  )
}

export default DateSelector