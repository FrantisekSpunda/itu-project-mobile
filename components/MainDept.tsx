import { Box } from '@/components/Box'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { tw } from '@/utils/utils.tailwind'
import { IconCoins } from '@tabler/icons-react-native'
import { View } from 'react-native'

export const MainDept = () => {
  const mainDeptData = {
    dept: 374,
    oweYou: 654,
    youOwe: 342,
  }

  return (
    <Box style={tw('relative')}>
      <IconCoins style={tw({ top: 12, position: 'absolute', right: 12 }, 'textGray')} />
      <ThemedText>Celkový dluh</ThemedText>
      <View style={tw('flexRow', 'itemsBaseline', 'mT3')}>
        <ThemedText type="heading1" style={tw('textGreen', 'mR3')}>
          {mainDeptData.dept > 0 && '+'}
          {mainDeptData.dept}Kč
        </ThemedText>
        <ThemedText type="caption" style={tw('textGray', 'mR3')}>
          Dluží vám: +{mainDeptData.oweYou}Kč
        </ThemedText>
        <ThemedText type="caption" style={tw('textGray')}>
          Dlužíte: -{mainDeptData.youOwe}Kč
        </ThemedText>
      </View>
    </Box>
  )
}
