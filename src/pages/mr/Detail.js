import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useSelector, useDispatch} from 'react-redux';
import { getAnalysis } from '../../redux/analysisRemarks/index';
import { getList } from '../../redux/supervisorsList';
import Loader from '../../components/loaders/Loader';
import { ScrollView, Select, CheckIcon, Box } from 'native-base';

const index = () => {

    let data = useSelector(state => state.analysis)
    let dispatch = useDispatch();
    const [service, setService] = React.useState('LK')
    let mrids = useSelector(state => state.supervisorList);
    let outputArray = [...mrids.data.active, ...mrids.data.blocked, ...mrids.data.inActive]
    let apiObject = {page:0,mrid:outputArray.map(item => item.mrid)}

    React.useEffect(() => {
      dispatch(getList(apiObject))
      .then(res => {
        dispatch(getAnalysis(apiObject))  
      })
    },[dispatch])


    const compareByHour = (a,b) => {
      return b[service] - a[service];
    }

  const tableData = [...data.data].sort(compareByHour);
  const tableHead = ['ID', 'OK', 'MD', 'LK'];
  const tableRows = tableData.map((rowData) => [rowData.id, rowData.OK, rowData.MD, rowData.LK]);

  if(data.loading) {
    return <Loader />
  }


  return (
    <>
      <ScrollView style={styles.container}>
        <Table borderStyle={styles.tableStyle}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableRows} textStyle={styles.text} />
        </Table>
      </ScrollView>
      <Select selectedValue={service} minWidth="200" accessibilityLabel="Sort Data By Key" placeholder="Sort Data By Key" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => {
                console.log(itemValue)
                setService(itemValue)
            }} >
            {
              ["OK",'MD',"LK"].map((item, i) => (
                <Select.Item label={item} value={item} />
              ))
            }
      </Select>
    </>
  )
}

export default index;


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',color:'#000' },
    head: { height: 40, backgroundColor: '#f1f8ff',color:'#000' },
    text: { margin: 6,width:'100%',color:'#000' },
    tableStyle: { borderWidth: 1, borderColor: '#c8e1ff' },
});