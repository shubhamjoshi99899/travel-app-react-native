const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
    watchIgnorePatterns: ['**/node_modules/**'],
  },
  resolver: {
    sourceExts: [...sourceExts, 'svg'],
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
  },
  maxWorkers: 2, // Reduce the number of parallel workers to 2 or as low as 1 if needed
};

module.exports = mergeConfig(defaultConfig, config);
