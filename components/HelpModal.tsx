import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import ledger_example from "../public/images/ledger_example.jpg";
import Image from "next/image";

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent p={6}>
        <ModalHeader fontWeight="bold" mb={4}>
          How to use...
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            1. For a{" "}
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
            2. On the "Session Ledger" page, copy the information like below.
          </Text>
          <Image
            src={ledger_example}
            alt="example of what to copy in ledger"
          ></Image>
          <Text mb={4} mt={4}>
            3. Paste this data into the text box, and click calculate to get the
            credits/debts between players.
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
