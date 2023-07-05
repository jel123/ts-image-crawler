import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { MenuContext } from "../App";
import { useContext } from "react";
type Status = "info" | "warning" | "error" | "loading" | "success" | undefined;

function AlertError({
  show,
  message,
  variant,
}: {
  show: boolean;
  message: string;
  variant: Status;
}) {
  const { setShowError } = useContext(MenuContext);
  return (
    <Alert status={variant}>
      <AlertIcon />
      <Box>
        <AlertTitle>ERROR</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        ml="auto"
        onClick={() =>
          setShowError({ show: false, message: "", variant: undefined })
        }
      />
    </Alert>
  );
}

export default AlertError;
