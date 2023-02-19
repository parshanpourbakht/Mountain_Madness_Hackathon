import React, { useState } from "react";
import { Box, Button, Heading, Text, Center } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

function Home() {
  const [fileData, setFileData] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFileData(acceptedFiles[0]);
    },
    accept: "csv",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", fileData);


    try {
      const response = await fetch("/analysis", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File submitted successfully");
        // handle success
      } else {
        console.error("Server error:", response.status);
        // handle error
      }
    } catch (error) {
      console.error("Request failed:", error);
      // handle error
    }
  };

  return (
    <Box maxW="4xl" mx="auto" mt={10}>
      <Center>
        <Box mb={8} pt={20}>
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
            mb={8}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            What Type of Texter Are{" "}
            <Text as={"span"} color={"orange.400"}>
              YOU?
            </Text>
          </Heading>
          <Text mb={4} fontSize="lg">
            Upload your Discord chat data and find out what type of texter
            you are! Simply drag and drop your CSV file into the box below or
            click to select a file.
          </Text>
          <Text fontWeight="bold" mb={4} fontSize="lg">
            How it works:
          </Text>
          <Text mb={4} fontSize="lg">
            Our app analyzes your chat data to identify your texting patterns
            and determine your unique texter type. Are you a long-winded
            conversationalist or a master of the one-liner? Find out now!
          </Text>
        </Box>
      </Center>

      <form onSubmit={handleSubmit}>
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderStyle="dashed"
          rounded="md"
          p={4}
          bgColor={"#FED8B1"}
          textAlign="center"
          cursor="pointer"
          _hover={{
            bg: "gray.50",
          }}
          mb={8}>
            
          <input {...getInputProps()} />

          <Text fontSize="lg">
            Drag and drop a CSV file here, or click to select a file
          </Text>
        </Box>

        {fileData && (
          <Box mt={4}>
            <Text fontSize="lg">File selected: {fileData.name}</Text>
            <Button type="submit" mt={4}>
              Submit
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
}

export default Home;
