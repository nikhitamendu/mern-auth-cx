//auth context helps you to share the information with all components  //
import { useState, useEffect, createContext } from "react" //we have to change in main.jsx   //antha ekada cheyataniki seperate seperate components lo kakunda
import API from '../api/apiCheck.js'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()//default store ...export enduku ante    //create chey context ni and authcontext ane variable ki assign chey   ...this is used to share between the components

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        refreshUser()     //refreshUser: page open ayye time lo, user already login lo vunnada chustundi.
    }, [])
    //checks token and get user data
    async function refreshUser() {
        try {
            await API.get("/refresh-token")    //backend ki velli valid token aa kaada ani chustadi
                .then((res) => {
                    console.log(res.data)
                    setUser(res.data.user)   //valid user ayithe returns user details //backend nundi vachina data ki user ki set chestunnam
                })
        }
        catch (err) {
            console.log(err)
            setUser(null)//error lo user undakunda remove cheyataniki
        }
        finally {
            setLoading(false)  //8th line ni false chesam
        }
    }

    const loginUser = (data) => {
        localStorage.setItem("token", data.token)  //login.jsx
        setUser(data.user)
        navigate("/")
    }

    const logoutUser = async () => {
        await API.post("/logout")
            .then((res) => {
                console.log(res.data)
                localStorage.removeItem("token")  //okavela logout ayithe token ni remove chey
                setUser(null)
                navigate("/login")
            })

    }

    return (
        <div>
            <AuthContext.Provider value={{ loginUser, logoutUser, loading, user }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}