import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getList } from '../../redux/supervisorsList';
import Loader from '../../components/loaders/Loader';
import CardSwipe from '../../components/profile/CardSwipe';
import EmpData from '../../components/loaders/EmpData';

const Active = ({navigation}) => {

    let data = useSelector(state => state.supervisorList);
    let dispatch = useDispatch()

    let apiObject = {page:0}

    React.useEffect(() => {
        dispatch(getList(apiObject))
    },[])

    console.log(data.data)

  if(data.loading) {
    return <Loader />
  }

  if(!data.data.active || data.data.active.length === 0) {
    return <EmpData />
  }

  return (
    <CardSwipe data={data.data.active} navigation={navigation}/>
    
  )
}

export default Active;
