import React from 'react'
import {getList} from "../redux/supervisorsList/index";
import { useDispatch,useSelector } from 'react-redux';
import CardSwipe from '../components/profile/CardSwipe';
import Loader from '../components/loaders/Loader';
import { getHierarchy } from '../redux/auth/loginSlice';
import MultiSelect from '../components/multiSelect/MultiSelect';
import axios from 'axios';
import {useToast,Box} from 'native-base';

const Profile = ({navigation}) => {

    const [mrids,setMrids] = React.useState([])
    let data = useSelector(state => state.supervisorList);
    let user = useSelector(state => state.auth)
    let dispatch = useDispatch()
    let outputArray = [...data.data.active, ...data.data.blocked, ...data.data.inActive]
    const toast = useToast();
    let apiObject = {page:0}

    React.useEffect(() => {
        dispatch(getList(apiObject))
        dispatch(getHierarchy({
            subDiv: '',
            section:'',
            area:'',
            mrid:'',
            agency: user.dataUser.agency,
            boardCode: user.dataUser.boardCode
          }))
    },[])

    const handleSubmit = async () => {
        // dispatch(getHierarchy({
        //     subDiv: '',
        //     section:'',
        //     area:'',
        //     mrid:'',
        //     agency: user.dataUser.agency,
        //     boardCode: user.dataUser.boardCode
        //   }))
        // return;
        let body = {
            "agency": user.dataUser.agency,
            "mridList": JSON.stringify(mrids)
        }
        console.log(body)
        // return;
        await axios.post(`https://mr.bharatsmr.com/supervisor/${user.dataUser.boardCode}/addMrid`, body,{
            headers: {
                authkey: user.dataUser.mobileNo
            }
        })
        .then(res => {
            console.log(res.data)
            // return;
            toast.show({
                render: () => {
                  return <Box bg="emerald.500" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                          {res.data.message}
                        </Box>;
                }
            });
            dispatch(getList(apiObject))
        })
        .catch(err => {
            toast.show({
                render: () => {
                  return <Box bg="error.500" px="4" py="2" rounded="sm" _text={{color:'#fff'}} mb={5}>
                          {"Something went wrong try again later"}
                        </Box>;
                }
            });
            console.log(JSON.stringify(err))
        })
    }


    


    if(data.loading) {
        return <Loader />
    }

    return (

        <>
            <MultiSelect 
                mrData={user.hierarchyData && user.hierarchyData[0]?.mrid}
                setMrids={setMrids}
                onSelectedItemsChange={() => handleSubmit()}
            />
            <CardSwipe api={getList} apiObject={apiObject} data={outputArray && outputArray} navigation={navigation}/>
        </>
    )
}

export default Profile
