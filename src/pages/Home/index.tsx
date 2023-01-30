
import React, { useState, useEffect } from 'react';
/* Estado, permite alterar o valor de uma variável no código e mostrar automaticamente na interface para o usuário 
 */

import './styles.css'

import {Card, CardProps} from '../../components/Card'

type ProfileResponse = {
  name: string;
  avatar_url: string;
}


type User = {
  name: string;
  avatar: string;

}


export function Home() {
  const [studentName, setStudentName] = useState(''); /* Estado tem 2 elementos,  padrão para declarar Estado [nome do estado"studentName"", função que atualiza o estado"setStudentName""] */

  const [students, setStudents] = useState<CardProps[]>([]);

  const [user, setUser] = useState<User>({} as User);

function handleAddStudent() { /* Toda vez que chamar essa função vai criar um objeto com 2 propriedades, o nome que vai pegar do estado, informado pelo usuário no input. e o time vai ser o horário atual*/
  const newStudent = {
    name: studentName,
    time: new Date().toLocaleTimeString("pt-br", {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  };

setStudents(prevState => [...prevState, newStudent]);
/* Conteúdo do estado anterior, e adicionando um novo estudante
['amanda']
['amanda' , Letícia] */

}


useEffect(() => {
//Corpo do useEffect, é executado AUTOMATICAMENTE assim que nossa interface é renderizada

//async no useEffect
async function fetchData() {
  const response = await fetch('https://api.github.com/users/rafaelFilimberti')
const data = await response.json() as ProfileResponse;
/* console.log("Dados ===>", data); */


setUser({
  name: data.name,
  avatar: data.avatar_url,

});
}

fetchData();
}, []); //no Array é informado os estados e toda vez que for atualizado algum valor será atualizado o useEffect


  return (
    <div className='container'>

      <header>
      <h1>Lista de Presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de Perfil" />
      </div>

      </header>
    
    <input
    type="text" 
    placeholder="Digite o nome..."
    onChange={e => setStudentName (e.target.value)} /* passando para o setStudentName qual o valor atual do input, e jogando para o estado */

    />

    <button type="button" onClick={handleAddStudent}>
      Adicionar</button>

  {
    students.map(student => (
      <Card 
      key={student.time}
      name={student.name} 
      time={student.time} />
      ))

//Quando usa estrutura de repetição, usar Key para criar uma chave única para cada componente
// map é usado para percorrer os itens dentro da lista   


}
 

 {/* name="Virginia" time="10:55:25" componentes
 criando propriedades para o documento */}
  
    </div>
  )
}


