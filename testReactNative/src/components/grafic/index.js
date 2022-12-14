import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View } from 'react-native'

class Grafic extends React.PureComponent {
    render() {
        const data = [80,90,82,83,87,98,4,5,7,9,8]

        const contentInset = { top: 20, bottom: 20 }

        return (
            <View style={{ height: 190,width:'90%',flexDirection: 'row',margin:10 }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: '#1b065e',
                        fontSize: 12,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value} Kg`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: 'rgb(5,100, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
        )
    }
}

export default Grafic;