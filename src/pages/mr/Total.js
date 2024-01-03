import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getList } from '../../redux/supervisorsList';
import Loader from '../../components/loaders/Loader';
import CardSwipe from '../../components/profile/CardSwipe';
import EmpData from '../../components/loaders/EmpData';

const Total = ({navigation}) => {

    let data = useSelector(state => state.supervisorList);
    let dispatch = useDispatch()
    let outputArray = [...data.data.active, ...data.data.blocked, ...data.data.inActive]

    let apiObject = {page:0}

    React.useEffect(() => {
        dispatch(getList(apiObject))
    },[])

  if(data.loading) {
    return <Loader />
  }

  if(!outputArray || outputArray.length === 0) {
    return <EmpData />
  }


  return (
    <CardSwipe data={outputArray} navigation={navigation}/>
  )
}

export default Total;
