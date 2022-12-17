import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../firebase'

const GetAuth = () => {
  const [user] = useAuthState(auth);
  return user
}

export default GetAuth