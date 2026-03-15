import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    name: 'MyApp',
  })
  .useReactNative({
    networking: true,
    asyncStorage: true,
  })
  .connect();

export default Reactotron;