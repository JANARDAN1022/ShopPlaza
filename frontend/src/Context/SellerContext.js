import { createContext,useState } from "react";

export const SellerContext = createContext();

export const SellerContextProvider = ({children})=>{
    const [SellerEmail, setSellerEmail] = useState("");
    const [Category, setCategory] = useState([]);
    const [SellerPassword,setSellerPassword]=useState("");
    const [AlreadySeller,setAlreadySeller]=useState(false);

    return(
        <SellerContext.Provider value={{SellerEmail,setSellerEmail,Category,setCategory,SellerPassword,setSellerPassword,AlreadySeller,setAlreadySeller}}>{children}</SellerContext.Provider>
    )
}