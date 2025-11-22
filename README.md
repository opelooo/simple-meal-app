# 97. Setting the Default Screen

Setting the Default Screen
When setting up a Navigator (like ```<Stack.Navigator>```) and registering its screens (via ```<Stack.Screen>```), you can decide which screen will be shown as a default when the app starts.

Out of the box, the top-most screen (i.e. the first child inside of ```<Stack.Navigator>``` is used as the initial screen.

i.e., in the following example, the AllProducts screen would be shown as an initial screen when the app starts:

```
<Stack.Navigator>
	<Stack.Screen name="AllProducts" component={AllProduct}/> // initial screen
	<Stack.Screen name="ProductDetails" component={ProductDetails}/>
</Stack.Navigator>
```

You can therefore change the initial screen by changing the ```<Stack.Screen>``` order. Alternatively, there also is an ```initialRouteName``` prop that can be set on the navigator component (i.e., on ```<Stack.Navigator>``` in this case):
```
<Stack.Navigator initialRouteName="ProductDetails">
	<Stack.Screen name="AllProducts" component={AllProduct}/>
	<Stack.Screen name="ProductDetails" component={ProductDetails}/>  // initial screen
</Stack.Navigator>
```

# 98. Understading the useNavigation Hook
There are two main stack navigator implementations in React Navigation: the native stack (faster, native components) and the JS stack (more customizable). Below are short usage examples and how to use the useNavigation hook.

Native Stack (recommended for performance)
- Install: @react-navigation/native-stack
- Uses native platform navigation primitives (UINavigationController / Fragment).
- Pros: better performance and native look. Cons: fewer header/custom-animation customizations.

Example:
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
```

JS Stack (createStackNavigator)
- Install: @react-navigation/stack
- Implemented in JS, more configurable header styles, transitions, gestures.
- Use when you need advanced customization unavailable in native-stack.

Example:
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
```

useNavigation Hook
- import from '@react-navigation/native'
- Gives access to navigation methods (navigate, goBack, replace, setOptions, etc.) inside any component (not only screen components).

Basic example:
```javascript
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

function MyButton() {
    const navigation = useNavigation();

    return (
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details', { id: 1 })}
        />
    );
}
```

Notes
- Choose native-stack for performance and platform-native behavior; choose createStackNavigator for maximum customization.
- useNavigation works with both navigator implementations.
- When using nested navigators, prefer strongly typed param lists to avoid runtime route/name errors.

# 116. React Context API

### Prop Drilling

Kalau kamu punya data seperti theme = "dark" atau user, lalu komponen yang butuh data itu ada jauh di bawah:

```html
<App>
  <Navbar>
    <Menu>
      <MenuItem>
        <Icon /> ← butuh theme
```

Tanpa Context, kamu harus kirim props terus menerus:

```html
<App theme="dark">
  <Navbar theme="dark">
    <Menu theme="dark">
      <MenuItem theme="dark">
        <Icon theme="dark" />
```

### Solusi: React Context API

Dengan Context, kamu bisa membuat satu sumber data, lalu komponen apa pun bisa mengambil data itu langsung, tanpa props berantai.

### Contoh Sederhana
1. Buat Context
```javascript
import { createContext } from "react";

export const ThemeContext = createContext();
```
2. Provider → Bungkus komponen supaya mereka bisa menerima datanya
```javascript
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Navbar />
    </ThemeContext.Provider>
  );
}
```
3. Gunakan di komponen mana saja (useContext → Ambil data dari context)
```javascript
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Navbar() {
  const theme = useContext(ThemeContext);
  return <div>Theme sekarang: {theme}</div>;
}
```
### Kapan Harus Memakai Context?

Gunakan Context kalau state dipakai oleh banyak komponen seperti:
- Autentikasi user (user login)s
- Theme (dark/light)
- Bahasa aplikasi (i18n)
- Cart (shopping cart)
- Pengaturan aplikasi global

Tidak cocok untuk state yang sering berubah cepat (misal: koordinat mouse, animasi), karena Context akan re-render semua komponen yang memakai context tersebut.