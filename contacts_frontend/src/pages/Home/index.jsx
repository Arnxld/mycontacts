import { useEffect, useState, useMemo, useCallback, use } from "react";
import { Link } from 'react-router-dom'
import { Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer, EmptyListContainer, SearchNotFoundContainer } from "../../pages/Home/styles";
import Loader from '../../components/Loader'
import Button from "../../components/Button";



import Modal from "../../components/Modal";
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import sad from '../../assets/images/icons/sad.svg'
import emptyBox from '../../assets/images/empty-box.svg'
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg'

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast"


export default function Home() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)


  const filteredContacts = useMemo(() => contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )), [contacts, searchTerm])

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactsList = await ContactsService.listContacts(orderBy)
      setHasError(false)
      setContacts(contactsList)
    }
    catch ( error ) {
      setHasError(true)

    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])



  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => prevState === 'asc' ? 'desc' : 'asc'
    )
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  function handleTryAgain() {
    loadContacts()
  }

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true)
    setContactBeingDeleted(contact)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted(null)
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true)

      await ContactsService.deleteContact(contactBeingDeleted.id)

      setContacts(prevState => prevState.filter(
        (contact) => contact.id != contactBeingDeleted.id
      ))

      handleCloseDeleteModal()

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao deletar o contato'
       })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <Container>
      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza de que deseja removar o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita</p>
      </Modal>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          placeholder="Pesquisar contato..."
          onChange={handleChangeSearchTerm}

        />
      </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )

        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' Contato' : ' Contatos'}
        </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="emptyBox" />
              <p>Você ainda não tem nenhum contato cadastrado.
                Clique no botão <strong>"Novo Contato"</strong> acima para cadastrar seu primeiro contato!</p>
            </EmptyListContainer>
          )}


          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />
              <span>Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong></span>
            </SearchNotFoundContainer>
          )}


          {filteredContacts.length > 0 && (
            <ListHeader orderby={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
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
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}


    </Container>
  )
}
