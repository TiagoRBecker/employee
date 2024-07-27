"use client";
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { basicURL } from "../components/utils/api";
import { useSession } from "next-auth/react";
import Loading from "../loading";

const Magazines = () => {
   const {data:session, status} = useSession()
  const [employee, setEmployee] = useState<any>({});
  const [dvl_employee, setDvl_employee] = useState([]);
  const [ loading, setLoading] = useState(true)
 
  
  const getMagazinesEmployee = async () => {
    //@ts-ignore
     const token = session?.user.accessToken
      console.log(token)
    const getData = await fetch(`${basicURL}/perfil`, {
      method: "GET",
      cache: "no-cache",
      headers:{
        Authorization:`Bearer ${token}`
       },
    });
    const response = await getData.json();
     console.log(response)
    setEmployee(response);
    setDvl_employee(response.dvl_employee)
   setLoading(false)
    return response;
  };

  useEffect(() => {
    if(status ==="authenticated"){
      getMagazinesEmployee();
    }
  
  }, [status]);
  
  const total = dvl_employee?.reduce(
    (acc:any, currentValue:any) => acc + currentValue?.paidOut,
    0
    );
     const receive = dvl_employee?.reduce(
      (acc:any, currentValue:any) => acc + currentValue?.paidOut,
      0
    );
    const toReceive = dvl_employee?.reduce(
      (acc:any, currentValue:any) => acc + currentValue?.toReceive,
      0
    );
     if(loading){
      return (
        <Loading/>
      )
     }
  return (
    <section className="container mx-auto h-full px-2">
      
      <div className="w-full min-h-screen py-10 flex flex-col md:flex-row  gap-4  justify-center">
        <div className="w-full md:w-[20%] flex flex-col   items-center gap-3">
          <Box shadow={"2xl"} bg="white" p={8} color="black" w={"100%"}>
            <h2 className="text-center">Total</h2>
            <div className="w-full flex items-center justify-center gap-2">
             
             <p>
             <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              </p> 

              <p className="font-bold">
                {Number(total).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </Box>
          <Box shadow={"2xl"} bg="#d96060" p={8} color="white" w={"100%"}>
            <h2 className="text-center">A receber</h2>
            <div className="w-full flex items-center justify-center gap-2">
              <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              </p>
            

              <p>
                {Number(receive).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </Box>

          <Box bg="#2E8B57" shadow={"2xl"} p={8} color="white" w={"100%"}>
            <h2 className="text-center">Recebido</h2>
            <div className="w-full flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <p>
                {Number(toReceive).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </Box>
          {employee.availableForWithdrawal > 50 && (
          <Box bg="#2E8B57" shadow={"2xl"} p={8} color="white" w={"90%"}>
            <Link
              className="w-full"
              href={`https://api.whatsapp.com/send?phone=5547996694708&text=Ol%C3%A1%20me%20chamo%20${employee.name}%0AGostaria%20de%20solicitar%20o%20saque%20${employee.availableForWithdrawal}%0AIndetificador%20${employee.id}%0AEmail%20do%20usu%C3%A1rio%20${employee.email}%0A`}
              target="_blank"
            >
              <h2 className="text-center">Disponivel para Saque</h2>
              <div className="w-full flex items-center justify-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
                <p>
                  {Number(employee.availableForWithdrawal).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </Link>
          </Box>
        )}
        </div>
        <TableContainer width={"100%"}>
          <h1 className="w-full text-left text-xl py-4 text-gray-400">
           Comissão Revistas
          </h1>
          <Table variant="simple" >
            <TableCaption>DVLS á pagar</TableCaption>
            <Thead background={"#14b7a1"}>
              <Tr>
                <Th color={"white"}></Th>
                <Th color={"white"}>Nome</Th>
                <Th color={"white"}>Preço</Th>
                <Th color={"white"}>Receber</Th>
                <Th color={"white"}>Recebido</Th>
                <Th color={"white"}>Status</Th>
              </Tr>
            </Thead>

           
                <Tbody>
                {dvl_employee?.map((dvl: any, index: number) => (
                <Tr key={index}>
                 
                  <Td><img src={dvl.picture} alt={dvl.name}  className="w-16 h-16 object-cover"/></Td>
                  <Td>{dvl.name}</Td>
                  
                  <Td>
                    <p className="font-bold ">

                    {Number(dvl.price).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    </p>
                  </Td>
                  <Td>
                    <p className="font-bold text-red-500">

                    {Number(dvl.paidOut).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    </p>
                  </Td>
                  <Td>
                    <p className="font-bold text-green-500">
                   

                    {Number(dvl.toReceive).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    </p>
                  </Td>
                  <Td>
                    {dvl.paidOut === 0 ? (
                      <p className="text-red-500">Finalizado</p>
                    ) : (
                      <p className="text-green-500">Ativo</p>
                    )}
                  </Td>
                 
                </Tr>
              ))}
              </Tbody>
             
            
             
            
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Magazines;
