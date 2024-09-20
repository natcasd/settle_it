import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ledger_example from "../public/images/ledger_example.jpg";
import Image from "next/image";

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const modalSize = useBreakpointValue({ base: "xxs", md: "3xl" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent p={3}>
        <Box bg="gray.100" p={4} position="relative" borderRadius="md">
          <ModalCloseButton />
          <ModalHeader fontWeight="bold" m={0} p={0} textAlign="center">
            How to use...
          </ModalHeader>
        </Box>
        <ModalBody>
          <Text mb={4}>
            <b>1.</b> For a{" "}
            <a
              href="https://www.pokernow.club"
              className="text-blue-500 underline"
            >
              pokernow.club
            </a>{" "}
            game, navigate to the ledger section of the log. It is a button on
            the bottom left of the table.
          </Text>
          <Text mb={4}>
            <b>2.</b> On the "Session Ledger" page, copy the information like
            below.
          </Text>
          <Image
            src={ledger_example}
            alt="example of what to copy in ledger"
            className="rounded-md"
          ></Image>
          <Text mb={4} mt={4}>
            <b>3.</b> Paste this data into the text box, and click calculate to
            get the credits/debts between players.
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
