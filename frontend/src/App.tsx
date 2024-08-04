import { FiTrash } from "react-icons/fi";
import { useState, useEffect, useRef, FormEvent } from "react";
import { api } from "./services/api";

interface CustomersProps{
  id:         string,
  name:       string,
  email:      string,
  status:     boolean,
  created_at: string
}

export default function App() {

  const[customers, setCustomers] = useState<CustomersProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers(){
    const response = await api.get("/customers");
    setCustomers(response.data)
  }

  async function handleSubimit(e: FormEvent){
    e.preventDefault();

    if(!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email:emailRef.current?.value
    })

    setCustomers(allCustomers => [...allCustomers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  async function handleDelete(id:string) {
    try{
      await api.delete("/customer", {
        params:{
          id:id
        }
      })

      const allCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(allCustomers)

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-950 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-white text-3xl font-medium">DevClient</h1>

        <form className="flex flex-col my-4" onSubmit={handleSubimit}>
          <label className="text-white font-medium">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="w-full mb-5 p-2 rounded outline-none"
            ref={nameRef}
          />

          <label className="text-white font-medium">Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            className="w-full mb-5 p-2 rounded outline-none"
            ref={emailRef}
          />

          <input 
            type="submit" 
            value="Cadastrar" 
            className="bg-cyan-400 text-gray-950 font-medium p-1 cursor-pointer rounded" />
        </form>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article 
            key={customer.id}
            className="w-full bg-white p-2 rounded relative hover:scale-105 duration-200"
            >
            <p><span className="font-medium">Nome: </span>{customer.name}</p>
            <p><span className="font-medium">Email: </span>{customer.email}</p>
            <p><span className="font-medium">Status: </span>{customer.status ? "ATIVO" : "INATIVO"}</p>

            <button 
            onClick={() => handleDelete(customer.id)}
            className="bg-red-500 absolute -top-2 right-1 shadow-md w-7 h-7 flex items-center justify-center rounded-full"
            >
              <FiTrash size={18} color="#fff"/>
            </button>
          </article>
          ))}
        </section>

      </main>
    </div>
  );
}
