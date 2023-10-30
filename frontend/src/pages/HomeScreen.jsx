import { useSelector } from "react-redux"

const HomeScreen = () => {
  const { userInfo } = useSelector(state => state.user)

  return (
    <div>
      {userInfo ? <h1>Welcome {userInfo.name}</h1> : <h1>Welcome</h1>}
    </div>
  )
}

export default HomeScreen