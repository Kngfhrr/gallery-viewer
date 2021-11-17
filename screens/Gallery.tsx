import React, {useCallback, useEffect, useState} from 'react';

import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';

import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as MediaLibrary from 'expo-media-library'
// @ts-ignore
import styled from 'styled-components/native';
import {Camera} from 'expo-camera';

const Container = styled.View`
  flex: 1;
  background-color: #2A3240;
  justify-content: center;
`;

const ImageWrap = styled.TouchableOpacity`
   flex: 1;
   justify-content: center;
   height: 100px;
   margin: 5px;
  
`


export default function ImagePickerExample(props: any) {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [paginate, setPaginate] = useState(25)


    const [hasPermission, setHasPermission] = useState(null);
    // const [type, setType] = useState(Camera.Constants.Type.back);
    const [data, setData] = useState([])

    console.log('STATUS', status)


    useEffect(() => {
        getAllPhotos()
    }, [paginate]);


    // const compressImage = async (uri, format = SaveFormat.JPEG) => { // SaveFormat.PNG
    //     const result = await manipulateAsync(
    //         uri,
    //         [{ resize: { width: 200 } }],
    //         { compress: 0.7, format }
    //     );
    //
    //     return  { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
    // };
    //
    // console.log('COMPRESS', compressImage('https://dsp-media.eskimi.com/upload/40231_3061119669_3acd1e3cb724dd3973efe627fd99fb93.jpg'))


    const getAllPhotos = async () => {
        await MediaLibrary.getAlbumsAsync({includeSmartAlbums: false})
        const photosTemp = await MediaLibrary.getAssetsAsync({first: paginate})

        // setPaginate(photosTemp.totalCount)

        const array = photosTemp.assets.map(asset => ({
            ...asset,
            type: asset.mediaType,
            // uri: asset.uri
        }))


        setData([...array] as any)
    }


    const askPermission = async () => {
        // const isCameraRollEnabled = await Permissions.getAsync(Permissions.CAMERA_ROLL)
        // if(isCameraRollEnabled.granted) {
        //     setLoaded(true)
        //     return
        // }
        // const {granted} = await  Permissions.askAsync(Permissions.CAMERA_ROLL)
        // if(granted) {
        //     const cameraRollRes = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        //     console.log(2, cameraRollRes)
        //     setLoaded(true)
        // } else {
        //     console.log('else')
        // }
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        console.log('status', status)
    }


    // const HEIGHT = 100
    //
    // const getItemLayout = useCallback((data, index) => ({
    //     length: HEIGHT,
    //     offset: HEIGHT * index,
    //     index
    // }), [])


    return (
        <Container>

            <FlatList
                // decelerationRate={'fast'}
                removeClippedSubviews={true}
                keyExtractor={(item, index) => item.uri}
                ListEmptyComponent={<Text style={{color: '#fff'}}>Test</Text>}
                numColumns={3}
                data={data}
                onScrollEndDrag={() => setPaginate(paginate + 25)}
                renderItem={({item, index}) => renderGrid(item)}
                // getItemLayout={getItemLayout}
                refreshing={true}
                updateCellsBatchingPeriod={1}
            />

        </Container>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
});


const renderGrid = (item: object, index: number) => {

    return (
        <ImageWrap>
            <View
                // source={{
                //     uri: item.uri,
                // }}
                style={{
                    width: '100%',
                    height: 100,
                    opacity: 0.85,
                    borderRadius: 5,
                    margin: 5,
                    backgroundColor: '#fff'
                }}
            />
        </ImageWrap>
    )


}
