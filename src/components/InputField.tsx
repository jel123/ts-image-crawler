import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { MenuContext } from "../App";
import axios from "axios";
function InputField() {
  const { imagesData, setImagesData, setShowError, setShowLoader, showLoader } =
    useContext(MenuContext);
  const [url, setUrl] = useState("");

  const clickHandler = async () => {
    // setImagesData({
    //   items: [{ url: "asfasf", fileSize: 200, fileType: "png" }],
    // });
    try {
      setShowLoader(true);
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      const request = await axios.get(
        `${serverUrl}api/data/${encodeURIComponent(url)}`
      );
      setImagesData({ items: [request.data[0]] });
      setShowError({ show: false, message: "", variant: undefined });
      setShowLoader(false);
    } catch (error: any) {
      setShowLoader(false);
      setImagesData({ items: [] });
      setShowError({ show: true, message: error.message, variant: "error" });
    }
  };

  return (
    <Box padding="10px 30px 30px">
      <Stack direction={"row"} w="2xl" margin="0 auto">
        <Button
          onClick={clickHandler}
          leftIcon={
            showLoader ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FiSettings />
              </motion.div>
            ) : (
              <FiSettings />
            )
          }
          colorScheme="green"
          variant="solid"
          size="lg"
        >
          Crawl
        </Button>
        <Input
          onChange={(e) => {
            console.log(e.target.value);
            setUrl(e.target.value);
          }}
          type="text"
          bgColor="white"
          focusBorderColor="green"
          placeholder="Put your url here https://example/com"
          size="lg"
        />
      </Stack>
    </Box>
  );
}

export default InputField;
