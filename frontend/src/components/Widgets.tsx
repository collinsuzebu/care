import { Box, Heading, Badge, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";

interface CardProps {
  heading: string;
  subheading: string;
  data: object[];
  mb?: number;
}

export interface keyable {
  [key: string]: any;
}

const isEvent = (data: keyable[]) => {
  return data && data[0] && data[0].event_count;
};

const Card: React.FC<CardProps> = ({ heading, subheading, data, mb = 0 }) => {
  const iseventData = isEvent(data);

  return (
    <Box
      maxW="sm"
      width="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb={mb}
      bg="#F7FBFB"
    >
      <Box
        width="100%"
        bg="green.100"
        color="blackAlpha.800"
        rounded="sm"
        p={5}
      >
        <Stack>
          <Heading size="md" fontSize="25px">
            {heading}
          </Heading>
          <Heading size="xs" color="gray.500">
            {subheading}
          </Heading>
        </Stack>
      </Box>
      <Box p="6">
        {data.map((option: keyable, index) => (
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            mb="2"
            key={index}
          >
            <Badge borderRadius="full" px="2" colorScheme="gray">
              {iseventData
                ? option.event_type
                : moment(option.timestamp).format("DD MMM YY, HH:mm")}
            </Badge>
            <Text ml="1" color="gray.500" fontSize="20px" fontWeight="bold">
              {iseventData
                ? `(${option.event_count})`
                : `by ${option.caregiver_id.substring(0, 7)}...`}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default Card;
