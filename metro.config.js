const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Přidej složky, které chceš sledovat
config.watchFolders = [
  path.resolve(__dirname, 'components'),
  path.resolve(__dirname, 'hooks'),
  path.resolve(__dirname, 'types'),
  path.resolve(__dirname, 'utils'),
  path.resolve(__dirname, 'constants'),
]

config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname), // Mapuje `@` na root projektu
}

module.exports = config
