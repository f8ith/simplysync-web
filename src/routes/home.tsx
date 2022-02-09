import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Select, GroupBase, SelectInstance } from "chakra-react-select";
import { useRef, useState } from "react";
import BookingView from "../components/BookingView";
import { Booking, ServiceOption, Service } from "../types/simplybook";
import { useQuery, BookingQuery } from "../urql/query";

export default function Home() {
  const selectRef =
    useRef<SelectInstance<ServiceOption, true, GroupBase<ServiceOption>>>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<Booking[]>();
  const [result, reexecuteQuery] = useQuery({
    query: BookingQuery,
    variables: { gte: date, lt: new Date(date.getTime() + 86400000) },
  });
  const handleServiceChange = (serviceOptions: Readonly<ServiceOption[]>) => {
    if (serviceOptions)
      setBookings(
        result.data.bookings.filter(
          (b: Booking) => b.service_id == (serviceOptions as any).value.id
        )
      );
  };
  const handleDateChange = (date: Date) => {
    setDate(date);
    selectRef.current?.clearValue();
    setBookings(undefined);
  };

  return (
    <>
      <Flex alignItems={"center"}>
        <FormControl>
          <FormControl p={4}>
            <FormLabel>Select date</FormLabel>
            <SingleDatepicker
              name="date-input"
              date={date}
              onDateChange={handleDateChange}
            />
          </FormControl>
          <FormControl p={4}>
            <FormLabel>Select class</FormLabel>
            <Select<ServiceOption, true, GroupBase<ServiceOption>>
              ref={selectRef}
              name="services"
              closeMenuOnSelect={true}
              size="md"
              onChange={handleServiceChange}
              options={(() => {
                if (result.data)
                  return Array.from(
                    new Set(
                      result.data.bookings
                        .map((a: Booking) => a.service)
                        .map((a: Service) => {
                          return { label: a.name, value: a };
                        })
                    )
                  ) as ServiceOption[];
              })()}
            />
          </FormControl>
        </FormControl>
      </Flex>
      <BookingView bookings={bookings}></BookingView>
    </>
  );
}
