// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  transformer,
  resolver: { assetExts },
} = defaultConfig;

defaultConfig.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
defaultConfig.resolver.assetExts = assetExts.filter((ext) => ext !== 'svg');

// https://github.com/facebook/metro/issues/535#issuecomment-1016709406
defaultConfig.resolver.sourceExts = process.env.RN_SRC_EXT
    ? [...process.env.RN_SRC_EXT.split(',').concat(defaultConfig.resolver.sourceExts), 'cjs'] // <-- cjs added here
    : [...defaultConfig.resolver.sourceExts, 'cjs'] // <-- cjs added here

defaultConfig.resolver.sourceExts.push('svg');


module.exports = defaultConfig;
