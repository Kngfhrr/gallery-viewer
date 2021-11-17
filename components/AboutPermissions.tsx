import { Button, Text, View } from 'react-native'
import React from 'react'
// @ts-ignore
import styled from 'styled-components/native'

const AboutPermissions = styled.View`
    flex: 1;
    background-color: #ccc;
    justify-content: center;
    align-items: center;
`

const Title = styled.Text`
    font-size: 18px;
`
const Description = styled.Text`
    font-size: 14px;
`

const InfoWrap = styled.View`
    margin-top: 20px;
    margin-bottom: 40px;
    display: flex;
    justify-content: flex-start;
`

interface PermissionInfoProps {
    onPress: () => void
}

const PermissionInfo = (props: PermissionInfoProps) => {
    const { onPress } = props

    return (
        <AboutPermissions>
            <Title>Галерея не доступна</Title>
            <InfoWrap>
                <Description>• Нажмите на кнопку получить доступ</Description>
                <Description>
                    • В диалоговом окне нажмите на кнопку{' '}
                    <Text style={{ fontWeight: 'bold' }}>Allow</Text>
                </Description>
            </InfoWrap>

            <Button title={'Получить доступ'} onPress={onPress} />
        </AboutPermissions>
    )
}

export default PermissionInfo
