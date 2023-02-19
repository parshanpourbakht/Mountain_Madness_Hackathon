import './Home'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home';

function App() {
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"http://localhost:5000/upload",
    })
    .then((response) => {
      const res = response.data
      setProfileData(({
        profile_name: res.ily,
        about_me: res.love}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          
          <p>To get your profile details: </p><button onClick={profileData}>Click me</button>
          {data && <div>
                <p>Profile name: {profileData.ily}</p>
                <p>About me: {profileData.love}</p>
              </div>
          }
         
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;