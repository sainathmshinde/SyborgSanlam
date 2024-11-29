import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getYears, months } from "@/lib/data";
// import { useDateStore } from "@/lib/store";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Combobox } from "./comboBox";

export function DatePicker({
  date,
  onChange,
  error,
  isDisabled,
  isRequired,
  label,
  id,
  size,
  fromDate,
}) {
  //   const monthInfo = useDateStore((state) => state.months);
  //   const yearInfo = useDateStore((state) => state.years);

  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    if (date?.length) {
      setSelectedDate(date);

      //   let currentDate = new Date(date);
      //   let dateMonth = currentDate.getMonth();
      //   let dateYear = currentDate.getFullYear();

      //   setMonth(monthInfo[dateMonth]);
      //   setYear(yearInfo[dateYear]);
    }
  }, [date]);

  const handleSelectDate = (event) => {
    let date = event.toISOString();
    setSelectedDate(date);
    onChange(date);
    setIsDatePickerOpen(false);
  };

  const handleChangeMonth = (event) => {
    setMonth(event);

    if (selectedDate?.length) {
      let date = new Date(selectedDate);
      date.setMonth(event?.id - 1);
      setSelectedDate(date.toISOString());
      onChange(date.toISOString());
    } else {
      let currentYear = new Date().getFullYear();
      let selectedMonth = event.id - 1;
      let currentDate = new Date(currentYear, selectedMonth, 1);
      setSelectedDate(currentDate.toISOString());
      //   setYear(yearInfo[currentYear]);
      onChange(currentDate.toISOString());
    }
  };

  const handleChangeYear = (event) => {
    setYear(event);
    let date = new Date(selectedDate);
    date.setFullYear(event?.id);
    setSelectedDate(date.toISOString());
    onChange(date.toISOString());
  };

  const handleArrowIconClick = (date) => {
    // let dateMonth = date.getMonth();
    // let dateYear = date.getFullYear();

    // setMonth(monthInfo[dateMonth]);
    // setYear(yearInfo[dateYear]);

    setSelectedDate(date.toISOString());
  };

  return (
    <div className="grid gap-1.5">
      {label.length ? (
        <Label htmlFor={id}>
          <span>{label}</span>
          {isRequired ? <span className="text-red-600	ml-1">*</span> : null}
        </Label>
      ) : null}
      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={
              error?.length
                ? " ring-red-600 focus-visible:ring-offset-0 focus-visible:ring-red-600 ring-1 justify-start text-left font-normal "
                : "focus-visible:ring-offset-0 focus-visible:ring-1 justify-start text-left font-normal"
            }
            disabled={isDisabled}
            size={size}
            onClick={() => {
              setIsDatePickerOpen(true);
            }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between p-3">
            <Combobox
              placeholder="Month"
              options={months}
              value={month}
              onChange={handleChangeMonth}
            />
            <Combobox
              placeholder="Year"
              options={getYears()}
              value={year}
              onChange={handleChangeYear}
            />
          </div>
          <Calendar
            mode="single"
            onSelect={handleSelectDate}
            onChange={handleChangeYear}
            selected={selectedDate?.length ? new Date(selectedDate) : null}
            month={selectedDate?.length ? new Date(selectedDate) : new Date()}
            onMonthChange={handleArrowIconClick}
            fromDate={fromDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

DatePicker.defaultProps = {
  id: "",
  name: "",
  date: "",
  onChange: () => {},
  error: "",
  isRequired: false,
  isDisabled: false,
  label: "",
  placeholder: "",
  size: "sm",
  fromDate: "",
};

DatePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  fromDate: PropTypes.string,
};
