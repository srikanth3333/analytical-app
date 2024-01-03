import React from "react";
import { Spinner, HStack, Heading, Center } from "native-base";

const Loader = () => {
  return <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>;
};

export default () => {
    return (
        <Center flex={1} px="3">
            <Loader />
        </Center>
    );
};
