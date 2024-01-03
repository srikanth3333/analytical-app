import React from "react";
import { Button, Modal, Center, Select, CheckIcon } from "native-base";
import { useState } from "react";
import MultiSelect from 'react-native-multiple-select';


const BasicModal = ({mrData}) => {

  const [showModal, setShowModal] = useState(false);
  return <Center>
      <Button onPress={() => setShowModal(true)}>Add Meter Reader</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
        _dark: {
            bg: "coolGray.800"
        },
        bg: "warmGray.50"
        }}>
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Select Meter Readers</Modal.Header>
          <Modal.Body>
            {/* <MultiSelect
                hideTags
                items={data}
                uniqueKey="id"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Select MR's"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={ (text)=> console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                /> */}
                <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                        }} mt={1} >
                            <Select.Item label={"Select None"} value={""} />
                            {
                                mrData && mrData[0]?.mrid.map((item) => (
                                    <Select.Item label={item} value={item} />
                                ))
                            }
                    </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              setShowModal(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>;
};

export default ({mrData}) => {
    return (
        <Center flex={1} px="3">
            <BasicModal mrData={mrData} />
        </Center>
    );
};
    