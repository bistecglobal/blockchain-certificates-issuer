
import { Button, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEth } from "apps/blockchain-frontend/contexts/EthContext";
import { useEffect,useState } from "react";


const BlockchainVerifier = ({setValue})=>{
    const { state: { contract, accounts } } = useEth(); 
    const [certId,setCertId] = useState(null);
    useEffect(()=>{
        try {
            read()
        } catch (error) {
            console.error(error)
        }
    },[]);
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const certificatesId:number = 123456;

    // const write = async ()=> {
    //     console.log(accounts)
    //     console.log(contract)
    //         await contract.methods.write(certificatesId).send({ from: accounts[0] });
    //     };

    //     const read = async () => {
    //         const value = await contract.methods.read().call({ from: accounts[0] });
    //     };  
    
  const read = async () => {
    // const value = await contract.methods.read().call({ from: accounts[0] });
    // setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (certId === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(certId);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };
        
     const handleClick=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
       
     }   

    return (
       

    <div>
       
        <Form>
            
        <Button  style={{position:"absolute",
        width:110,
        left:"80%",
        top:"86.8%"
    }} type="primary"   onClick={(e)=>{ handleClick(e) }}> Verify</Button>
       </Form>
    </div>
    )
    
}

export default BlockchainVerifier;

