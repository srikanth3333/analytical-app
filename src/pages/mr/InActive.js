import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getList } from '../../redux/supervisorsList';
import Loader from '../../components/loaders/Loader';
import CardSwipe from '../../components/profile/CardSwipe';
import EmpData from '../../components/loaders/EmpData';

const Blocked = ({navigation}) => {

    let data = useSelector(state => state.supervisorList);
    let dispatch = useDispatch()

    let apiObject = {page:0}

    React.useEffect(() => {
        dispatch(getList(apiObject))
    },[])

  if(data.loading) {
    return <Loader />
  }

  if(!data.data.inActive || data.data.inActive.length === 0) {
    return <EmpData />
  }

  return (
    <CardSwipe data={data.data.inActive} navigation={navigation}/>
  )
}

export default Blocked;
