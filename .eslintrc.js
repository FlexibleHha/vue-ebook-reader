module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-trailing-spaces': 'off',
		'no-multiple-empty-lines': 'off',
		'indent': 'off',
		'no-tabs': 'off',
		'key-spacing': 'off',
		'semi': 'off',
		'no-undef': 'off',
		'space-before-function-paren': 'off',
		'keyword-spacing': 'off',
		'no-multi-spaces': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
