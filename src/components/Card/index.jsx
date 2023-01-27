

import './styles.css'

export function Card(props) {
    /* props , através desse objeto podemos acessar as propriedades
    {name , time} pode usar sem o props.
    */
    return (
        <div className='card'>
            <strong>{props.name} </strong>
            <small>{props.time}</small>
        </div>
    )
}