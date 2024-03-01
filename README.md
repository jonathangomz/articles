# Articles Frontend

## Description
Frontend of the articles project developed with React + Vite.

### To Do:
- [X] Authentication
- [ ] Theme
  - [ ] Tailwind?
- [ ] Components
  - [ ] Login
    - [X] Blueprint
    - [ ] Routing
    - [ ] Logic
    - [X] Styles
  - [ ] Logout Button
    - [X] Blueprint
    - [ ] Routing
    - [ ] Logic
    - [ ] Styles
  - [X] Articles list
    - [X] Blueprint
    - [ ] Routing
    - [ ] Logic
    - [ ] Styles
  - [X] Create Article Button
    - [X] Blueprint
    - [ ] Routing
    - [ ] Logic
    - [ ] Styles
  - [X] Create Article
    - [x] Blueprint
    - [ ] Routing
    - [ ] Logic
    - [ ] Styles
  - [ ] Read Article
    - [ ] Blueprint
    - [ ] Routing
    - [ ] Logic
    - [ ] Styles
- [ ] Improve project structure
- [ ] Improve authentication
- [ ] Use rich text editor for articles content?
  - [ ] Draft.js


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
