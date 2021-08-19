import React from "react";
import { TimeIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

/*
Adapted from https://gist.github.com/igoro00/99e9d244677ccafbf39667c24b5b35ed 
*/

export const DatePickerInput = React.forwardRef((props: any, ref: any) => {
  return (
    <Button
      leftIcon={<TimeIcon />}
      colorScheme="teal"
      variant="solid"
      onClick={props.onClick}
      ref={ref}
      pr="8"
    >
      {props.value || props.placeholder}
    </Button>
  );
});

const DatePicker = ({ ...props }: ReactDatePickerProps) => {
  const isLight = useColorMode().colorMode === "light";

  return (
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        className="react-datapicker__input-text"
        placeholderText="Today"
        isClearable
        showYearDropdown
        {...props}
      />
    </div>
  );
};

export default DatePicker;
