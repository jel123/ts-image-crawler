import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import InputField from "./components/InputField";
import FilterMime from "./components/FilterMime";
import MimeList from "./components/MimeList";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { ImagesTypeData, MyInterface } from "./utils/Types";
import AlertError from "./components/AlertError";

type Status = "info" | "warning" | "error" | "loading" | "success" | undefined;
interface IMenuContext {
  imagesData: MyInterface;
  setImagesData: Dispatch<SetStateAction<MyInterface>>;
  showError: { show: boolean; message: string; variant: Status };
  setShowError: Dispatch<
    SetStateAction<{ show: boolean; message: string; variant: Status }>
  >;
  showLoader?: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
}

export const MenuContext = createContext<IMenuContext>({
  imagesData: { items: [] },
  setImagesData: () => {},
  showError: { show: false, message: "", variant: undefined },
  setShowError: () => {},
  showLoader: false,
  setShowLoader: () => {},
});

function App() {
  const [imagesData, setImagesData] = useState<MyInterface>({
    items: [],
  });

  const [showError, setShowError] = useState<{
    show: boolean;
    message: string;
    variant: Status;
  }>({
    show: false,
    message: "",
    variant: undefined,
  });

  const [showLoader, setShowLoader] = useState<boolean>(false);

  return (
    <MenuContext.Provider
      value={{
        imagesData,
        setImagesData,
        showError,
        setShowError,
        showLoader,
        setShowLoader,
      }}
    >
      <Flex flexDirection="column" w={"full"}>
        <Box w="full" backgroundColor="gray.700">
          <Stack padding="2.5" direction="column" align="center">
            <Heading mb={4} color="white" textAlign="center">
              CRAWL IMAGES
            </Heading>
            <Text fontSize="xl" color="gray.500">
              Crawl images within any public domain
            </Text>
          </Stack>
          <InputField />
        </Box>
        <FilterMime />
        {showError.show ? (
          <AlertError
            show={showError.show}
            message={showError.message}
            variant={showError.variant}
          />
        ) : (
          ""
        )}
        <MimeList />
      </Flex>
    </MenuContext.Provider>
  );
}

export default App;
