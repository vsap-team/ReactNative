import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {View, Text,SafeAreaView} from 'react-native';
import AppStatusBar from '../../componenets/Appstatusbar';
import * as XLSX from 'xlsx'
import RNFetchBlob from 'rn-fetch-blob'; 
import { logout,useAuth,db} from "../../service/firebase";
import { setDoc, doc, getDocs, collection, addDoc } from "firebase/firestore";
import DocumentPicker from 'react-native-document-picker';

export default function File({navigation}) {
  const [FileResponse, setFileResponse] = useState('');
  const [excelData, setExcelData] = useState(null);
  const { readFile } = RNFetchBlob.fs;
  


  async function HandleFile() {
    try {
      const f = await DocumentPicker.pick({
              type: [DocumentPicker.types.xlsx],
            });
      const path=f[0].uri;
      setFileResponse(f);
            
      const res = await readFile(path, 'ascii');
      const workbook = XLSX.read(new Uint8Array(res), {type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // console.log(data)
      SortJson(data)
        // type:[types.pdf]m
      }
    catch (err) {
          console.warn(err);
        }
      }
      function Logout(){
        logout()
        console.log(user)
        
      }
      const user=useAuth();
  
  async function handleSubmit() {
    console.log('submit clicked');
    let len = excelData.length;
    console.log(excelData)
    for (let i = 0; i < len; i++) {
      try {
        await addDoc(collection(db,"File-upload"), {
        RollNo:excelData[i].RollNo,
        FirstName: excelData[i].FirstName,
        LastName: excelData[i].LastName,
        Gender:excelData[i].Gender,
        Country:excelData[i].Country,
        Age:excelData[i].Age,
        Mode:excelData[i].Mode
        });
        if(i===len-1){
        alert('updated successfully');
        console.warn('updated successfully');
        }
      }
      catch {
        alert('Error Occurred');
      }
  }
  }


  function SortJson(data) {
    const dataThreads = data.map(data => {
      // console.log(data.FirstName)

      return {
        RollNo: data.RollNo,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Gender: data.Gender,
        Country: data.Country,
        Age: data.Age,
        Mode: data.Mode,
      };
    });
    console.log("dataThreads")
     //console.log(dataThreads)
    setExcelData(dataThreads);
    console.log(excelData);
  }

  return (
    <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'flex-end',
          }}>
          <AppStatusBar backgroundColor={'#87CEEB'} barStyle="dark-content" />
    <View style={{backgroundColor:'#87CEEB' ,flex:1}}>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Text style={{color: 'black', fontSize: 30}}>Upload Excel Files</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '85%',
          marginTop: 80,
          paddingHorizontal:20
        }}>
        <Button
          onPress={() => {
            console.log('clicked');
            HandleFile();
          }}
          mode="outlined">
          Choose File
        </Button>

        <Text
          style={{
            color: 'red',
            margin: 1,
            borderColor: 'black',
            borderWidth: 0.3,
            borderStyle: 'solid',
            padding: 5,
            paddingHorizontal:20
          }}>
          File Name:
          {FileResponse === '' ? ' No file selected' : FileResponse[0].name}
        </Text>
      </View>
      <View style={{marginTop: 20, paddingHorizontal: 80}}>
      <Button
          onPress={() => {
            console.log('clicked');
             handleSubmit();
          }}
          mode="outlined"
          color='green'>
          upload
        </Button>
      </View>
      <View>
        {/* <Text style={{color:'black'}}> {excelData!==null?excelData[0].FirstName:'no file selected'}</Text> */}
        <Text style={{color:'blue',fontSize:20,marginTop:30}}>View file preview</Text>
      </View>
    </View>
    <View>
      <Button mode='outlined' onPress={() => {Logout();navigation.push("Login")}}>logout</Button>
    </View>
    </SafeAreaView>
  );
}
