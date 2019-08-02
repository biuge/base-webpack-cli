module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-proposal-class-properties',
        { loose: true },
      ],
      '@babel/plugin-proposal-function-bind',
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true
        }
      ]
    ],
  };
};
