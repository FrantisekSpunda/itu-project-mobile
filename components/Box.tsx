import { tw } from '@/utils/utils.tailwind'
import { View, ViewProps } from 'react-native'

type BoxProps = ViewProps & {
  style?: any[]
}

export const Box = ({ style = [], children, ...rest }: BoxProps) => {
  return (
    <View {...rest} style={[...tw('wFull', 'relative', 'p3', 'roundedLg', 'bgWhite', 'borderT4', 'borderPrimary'), ...style]}>
      {children}
    </View>
  )
}
