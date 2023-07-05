import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MenuContext } from "../App";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { ImagesTypeData, MyInterface } from "../utils/Types";
import useFetchData from "../hooks/useFetchData";
import { Buffer } from "buffer";
import { saveAs } from "file-saver";

function MimeList() {
  const { imagesData } = useContext(MenuContext);
  const [updatedImages, setUpdatedImages] = useState<MyInterface>();

  useEffect(() => {
    setUpdatedImages(imagesData);
  }, [imagesData]);

  console.log(updatedImages);
  const gotoHandler = (url: string) => {
    const newWindow = window.open(url, "_blank");
    newWindow?.focus();
  };

  return (
    <SimpleGrid
      spacing={4}
      p={10}
      templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
    >
      {updatedImages?.items[0]?.map((data, key) => {
        return (
          <>
            <Card key={key} p={5}>
              <Image src={data?.url} objectFit="cover" />
              <CardBody pl={0} pr={0}>
                <HStack justify="space-between">
                  <VStack align="flex-start">
                    <Text as="b">
                      {data?.fileDimension?.width} X{" "}
                      {data?.fileDimension?.height}
                    </Text>
                    <Text as="b">
                      File Size:
                      <Text as="i" fontWeight="400" color="green.500">
                        {data?.fileSize}/kb
                      </Text>
                    </Text>
                  </VStack>
                  <Tag colorScheme="green">{data?.fileType}</Tag>
                </HStack>
              </CardBody>
              <Divider />
              <CardFooter pl={0} pr={0}>
                <HStack>
                  {/* <Button
                    colorScheme="green"
                    onClick={() => downloadHandler(data.url)}
                  >
                    <Icon as={FiDownload}></Icon>
                  </Button> */}
                  <Button
                    colorScheme="green"
                    onClick={() => gotoHandler(data.url)}
                  >
                    <Icon as={FiExternalLink}></Icon>
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </SimpleGrid>
  );
}

export default MimeList;
