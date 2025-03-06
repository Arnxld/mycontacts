import { useState } from "react";
import { Link } from 'react-router-dom'
import { Container, InputSearchContainer, Header, ListContainer, Card } from "../../pages/Home/styles";
import Loader from '../../components/Loader'


import Modal from "../../components/Modal";
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'


export default function Home() {
  return (
    <Container>
      {/* <Modal $danger /> */}
      {/* <Loader /> */}

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..."/>
      </InputSearchContainer>

      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Pedro Arnold</strong>
              <small>instagram</small>
            </div>

            <span>email@email.com</span>
            <span>(11) 9999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  )
}
