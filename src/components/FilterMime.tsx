import { Box, Select, Stack, Text } from "@chakra-ui/react";
import { MenuContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { ImagesTypeData } from "../utils/Types";
import { filter } from "cheerio/lib/api/traversing";
function FilterMime() {
  const { imagesData, setImagesData } = useContext(MenuContext);
  const [filterType, setFilterType] = useState("");

  const sortedFile = imagesData?.items[0]?.reduce<ImagesTypeData>(
    (acc, file) => {
      const index = acc.findIndex((item: { fileSize: number }) => {
        switch (filterType) {
          case "lowest":
            return file.fileSize < item.fileSize;

          case "heighest":
            return file.fileSize > item.fileSize;
        }
      });

      if (index === -1) {
        acc.push(file);
      } else {
        acc.splice(index, 0, file);
      }
      return acc;
    },
    []
  );

  useEffect(() => {
    setImagesData({ items: [sortedFile] });
  }, [filterType]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  return (
    <Box boxShadow="lg" p="6" bg="white">
      <Stack direction="row" justifyContent="space-between" align="center">
        <Select
          bg="green.500"
          borderColor="green.500"
          color="white"
          placeholder="Filter by"
          w="48"
          onChange={(e) => onChangeHandler(e)}
        >
          <option value="lowest">File Size (lowest to heighest)</option>
          <option value="heighest">File Size (heighest to lowest)</option>
        </Select>
        <Box display="flex" flexDir="row">
          <Text as="i"> count: </Text>
          <Text as="b" ml={2}>
            {imagesData.items[0]?.length ? imagesData.items[0]?.length : 0}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default FilterMime;
