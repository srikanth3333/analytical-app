import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

let items = []

export default class MultiSelect extends Component {
  constructor() {
    super();
    this.props;
    this.state = {
      selectedItems: [],
    };
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    this.props.setMrids(selectedItems)
  };

  render() {
    let data = this.props.mrData && this.props.mrData.map((item) => ({name:item,id:item}))
    return (
      <View>
        <SectionedMultiSelect
          items={data}
          IconRenderer={Icon}
          uniqueKey="id"
        //   subKey="children"
          selectText="Select meter reader ID to assign..."
          showDropDowns={true}
          onSelectedItemsChange={(val) => {
            this.onSelectedItemsChange(val)
          }}
          onConfirm={this.props.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          showChips={false}
          searchPlaceholderText="Search with MRID"
        />
      </View>
    );
  }
}
