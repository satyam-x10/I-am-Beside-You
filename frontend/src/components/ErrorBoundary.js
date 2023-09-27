import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container maxW="xl" centerContent margin="auto">
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="390px"
        bg="#182126"
        color="yellow.300"
        borderRadius="16px"
        borderWidth="2px"
        borderColor="black"
      >
        <AlertIcon boxSize="45px" mr={0} color="white" />
        <AlertTitle mt={5} fontSize="3xl" color="#319795">
          Loading Chats...
        </AlertTitle>
        <Spinner
          m={6}
          thickness="6px"
          speed="0.99s"
          emptyColor="gray.200"
          color="#319795"
          size="xl"
        />
        <AlertDescription  maxWidth="md" color="white">
         
        </AlertDescription>
        <Button
          fontWeight="bold"  
          variant="ghost"
          bg="#319795"
          mt={7}
          color="black"
          borderColor="black"
          onClick={resetErrorBoundary}
        
         
        >
         Skip To Chats
        </Button>
      </Alert>
    </Container>
  );
}

export default ErrorFallback;
