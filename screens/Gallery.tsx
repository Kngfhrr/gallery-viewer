import React, { useCallback, useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { ActivityIndicator, FlatList } from 'react-native'
import RenderGrid from '../components/Grid'
// @ts-ignore
import styled from 'styled-components/native'
import * as MediaLibrary from 'expo-media-library'
import PermissionInfo from '../components/AboutPermissions'
import { setImage, loadImages } from '../store/root/actions'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

interface GalleryProps {
    data: []
    loadImages: (array: { uri: string }[]) => void
    setImage: (e: string) => void
    navigation: NavigationProp<ParamListBase>
}

const Container = styled.View`
    flex: 1;
    background-color: #2a3240;
    justify-content: center;
`

function Gallery(props: GalleryProps) {
    const { data } = props

    const [paginate, setPaginate] = useState(25)
    const [hasPermission, setHasPermission] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        askPermission()
    }, [])

    const getAllPhotos = async () => {
        const photosTemp = await MediaLibrary.getAssetsAsync({
            first: paginate,
        })
        const array = photosTemp.assets.map((asset) => ({
            ...asset,
            type: asset.mediaType,
            uri: asset.uri,
        }))

        props.loadImages(array)
    }

    const askPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync()
        const granted = status === 'granted'
        // @ts-ignore
        setHasPermission(granted)
        granted && (await getAllPhotos())
    }

    const onScrollEnd = async () => {
        try {
            setLoading(true)
            setPaginate(paginate + 25)
            await getAllPhotos()
        } finally {
            setLoading(false)
        }
    }

    const HEIGHT = 100

    const getItemLayout = useCallback(
        (data, index) => ({
            length: HEIGHT,
            offset: HEIGHT * index,
            index,
        }),
        []
    )

    return (
        <Container>
            {hasPermission ? (
                <FlatList
                    removeClippedSubviews={false}
                    keyExtractor={(item, index) => `${index}`}
                    numColumns={3}
                    data={data}
                    pagingEnabled={false}
                    onEndReached={onScrollEnd}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator color={'#fff'} size={'large'} />
                        ) : null
                    }
                    renderItem={({ item, index }) => (
                        <RenderGrid
                            onSelect={(e: string) => props.setImage(e)}
                            item={item}
                            index={index}
                            {...props}
                        />
                    )}
                    getItemLayout={getItemLayout}
                />
            ) : (
                <PermissionInfo onPress={askPermission} />
            )}
        </Container>
    )
}

export default connect(
    (state: any) => ({
        data: state.data.images,
    }),
    { setImage, loadImages } // @ts-ignore
)(Gallery)
