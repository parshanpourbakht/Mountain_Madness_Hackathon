import React, { useState } from "react";
import { Box, Button, Heading, Text, Center } from "@chakra-ui/react";

import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


import { useDropzone } from "react-dropzone";


function Home() {
    
    const [fileData, setFileData] = useState(null);
  
    // Init useDropzone hook for drag and drop functionality
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        setFileData(acceptedFiles[0]);
      },
      accept: "csv",
    });
  
    const handleSubmit = () => {  // Handle form submission upon clicking the Submit button
        const formData = new FormData();  // Create a new FormData object to hold the file data
        formData.append("csvFile", fileData);  // Append the file data to the FormData object with the key "csvFile"
    };
  
    return (
      <Box maxW="4xl" mx="auto" mt={10}>
        <Center>
          <Box mb={8} pt={20}>
            <Heading 
              as="h1" size="xl" textAlign="center" mb={8}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              What Type of Texter Are <Text as={'span'} color={'orange.400'}>YOU?</Text>
            </Heading>
            <Text mb={4} fontSize="lg">
              Upload your Discord chat data and find out
              what type of texter you are! Simply drag and
              drop your CSV file into the box below or click
              to select a file.
            </Text>
            <Text fontWeight="bold" mb={4} fontSize="lg">How it works:</Text>
            <Text mb={4} fontSize="lg">
              Our app analyzes your chat data to identify your texting
              patterns and determine your unique texter type. Are you
              a long-winded conversationalist or a master of the
              one-liner? Find out now!
            </Text>
          </Box>
        </Center>

        <Box
          {...getRootProps()}
          borderWidth={2}
          borderStyle="dashed"
          rounded="md"
          p={4}
          textAlign="center"
          cursor="pointer"
          _hover={{
            bg: "gray.50",
          }}
          mb={8}
        >
          <input {...getInputProps()} />

          <Text fontSize="lg">
            Drag and drop a CSV file here, or click to select a file
          </Text>
        </Box>

        {fileData && (
          <Box mt={4}>
            <Text fontSize="lg">
              File selected: {fileData.name}
            </Text>
            <Button onClick={handleSubmit} mt={4}>
              Submit
            </Button>
          </Box>
        )}
      </Box>
    );
  }
  
  export default Home;
  