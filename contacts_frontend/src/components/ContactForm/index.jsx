import { useState, useEffect } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";

import { Form, ButtonContainer } from "../ContactForm/styles";

import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import FormGroup from '../FormGroup/'

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])

  const {setError, removeError, getErrorMessageByFieldName, errors} = useErrors()

  const isFormValid = (name && errors.length === 0)

  useEffect(() => {
    async function loadCategories() {
      const categoriesList = await CategoriesService.listCategories()

      setCategories(categoriesList)
    }

    loadCategories()
  }, [])

  function handleNameChange(event) {
    setName(event.target.value)

    if(!event.target.value) {
      setError({ field:'name', message:'Nome é obrigatório'})
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)

    if(event.target.value && !isEmailValid(event.target.value)) {
      setError({field: 'email', message: 'E-mail inválido'})
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value))
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log({
      name, email, phone: phone.replace(/\D/g, ''), category
    })
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button disabled={!isFormValid}
        type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
}
