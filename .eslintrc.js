 module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",// 使用非默认的 babel-eslint 作为代码解析器. 这样 eslint 就能识别 babel 语法的代码
     globals: {
      sessionStorage: false,
      window: false,
      Headers: false,
      rootPath: false,
      document: false,
      Swiper: false,
      DDMap: false,
      Raven: false,
      Omega: false,
    },

    rules: {
      'camelcase': 0,
      'react/prop-types': 0,
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'react/no-array-index-key': 0,
      'import/no-extraneous-dependencies': 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};
