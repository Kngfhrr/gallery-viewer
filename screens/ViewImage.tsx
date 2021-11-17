import * as React from 'react'

import { Image } from 'react-native'
import { connect } from 'react-redux'
// @ts-ignore
import styled from 'styled-components/native'

interface ViewImageProps {
  uri: string
}

const Container = styled.View`
    flex: 1;
    background-color: #2a3240;
    justify-content: center;
`

function ViewImage(props: ViewImageProps) {
    return (
        <Container>
            <Image
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                source={{ uri: props.uri }}
            />
        </Container>
    )
}

export default connect(
    (state: any) => ({
        uri: state.data.selected,
    }),
    {}
)(ViewImage)
