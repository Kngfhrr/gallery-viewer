import React, { PureComponent } from 'react'
import { Image } from 'react-native'
// @ts-ignore
import styled from 'styled-components/native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

interface IRecipeProps {
    index: number
    item: any
    navigation: NavigationProp<ParamListBase>
    onSelect: (uri: string) => void
}

const ImageWrap = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    height: 100px;
    margin: 3px;
`

class RenderGrid extends PureComponent<IRecipeProps> {
    render() {
        return (
            <ImageWrap
                key={this.props.index}
                onPress={() => {
                    this.props.onSelect(this.props.item.uri)
                    this.props.navigation.navigate('ViewImage')
                }}
            >
                <Image
                    source={{ uri: this.props.item.uri }}
                    style={{
                        width: '100%',
                        height: 100,
                        opacity: 0.85,
                        borderRadius: 5,
                        margin: 0,
                        backgroundColor: '#fff',
                    }}
                />
            </ImageWrap>
        )
    }
}

export default RenderGrid
