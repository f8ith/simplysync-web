import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Booking } from "../types/simplybook";
import { FiDownload } from "react-icons/fi";

export default function BookingView({
  bookings,
}: {
  bookings: Booking[] | undefined;
}) {
  if (bookings === undefined || bookings.length === 0) return null;
  const clients = bookings
    .map((b: Booking) => b.client)
    .map(({ __typename, ...props }) => props);

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(clients[0]).join(",") +
      "\n" +
      clients.map((c) => Object.values(c).join(",")).join("\n");
    window.open(encodeURI(csvContent));
  };
  return (
    <>
      <Table mt={5} p={4}>
        <Thead>
          <Tr>
            {Object.keys(clients[0]).map((key) => (
              <Th key={key}>{key}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((item) => (
            <Tr key={item.id}>
              {Object.values(item).map((value) => (
                <Td key={value}>{value}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        float="right"
        mt="5"
        leftIcon={<FiDownload />}
        onClick={downloadCSV}
        variant="solid"
      >
        Download CSV
      </Button>
    </>
  );
}
