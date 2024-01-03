import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useSelector, useDispatch} from 'react-redux';
import { getRealTime } from '../../redux/realtime/index';
import { getList } from '../../redux/supervisorsList';
import Loader from '../../components/loaders/Loader';
import { ScrollView, Select, CheckIcon } from 'native-base';
import PieChart from '../../components/graphs/piecharts/PieChart';

const index = () => {

    let data = useSelector(state => state.realtime)
    let user = useSelector(state => state.auth)
    let dispatch = useDispatch();
    const [service, setService] = React.useState('')
    let mrids = useSelector(state => state.supervisorList);
    let outputArray = [...mrids.data.active, ...mrids.data.blocked, ...mrids.data.inActive]
    let items = outputArray.map((item) => ({label:item.mrid,value:item.mrid}))
    let apiObject = {page:0,mridList:outputArray.map(item => item.mrid)}
    React.useEffect(() => {
      dispatch(getList(apiObject))
      .then(res => {
        dispatch(getRealTime(apiObject))  
      })
    },[dispatch])


  const compareByHour = (a,b) => {
    return a.hour - b.hour;
  }

  const tableData = [...data.data].sort(compareByHour);
  const tableHead = ['Hour', 'OK', 'MD', 'DL'];
  const tableRows = tableData.map((rowData) => [rowData.hour, rowData.OK, rowData.MD, rowData.DL]);
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
        {/* <PieChart data={tableData} /> */}
      </ScrollView>
      <Select selectedValue={service} minWidth="200" accessibilityLabel="Select meter Reader" placeholder="Select meter Reader" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => {
            setService(itemValue)
            dispatch(getList(apiObject))
            .then(res => {
              dispatch(getRealTime({...apiObject, mridList: Array.isArray(itemValue) ? itemValue : itemValue.split(',')}))  
            })
        }}>
            <Select.Item label={"Show all"} value={outputArray.map(item => item.mrid)} />
            {
              items.map((item, i) => (
                <Select.Item label={item.label} value={item.value} />
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
    text: { margin: 6,color:'#000' },
    tableStyle: { borderWidth: 1, borderColor: '#c8e1ff' },
});