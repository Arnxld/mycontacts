import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, InputSearchContainer, Header, ListContainer, Card } from "../../pages/Home/styles";
import Loader from '../../components/Loader'


import Modal from "../../components/Modal";
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'


export default function Home() {
  const [contacts, setContacts] = useState([])


  useEffect(() => {
    fetch('http://localhost:3000/contacts')
    .then(async (response) => {
      const json = await response.json()
      setContacts(json)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <Container>
      {/* <Modal $danger /> */}
      {/* <Loader /> */}

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..."/>
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' Contato' : ' Contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (<small>{contact.category_name}</small>)}
              </div>

              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/{contact.id}`}>
                <img src={edit} alt="edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="delete" />
              </button>
            </div>
          </Card>
        ))}


      </ListContainer>
    </Container>
  )
}
