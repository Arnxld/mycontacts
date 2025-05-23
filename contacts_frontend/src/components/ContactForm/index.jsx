import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";

import { Form, ButtonContainer } from "../ContactForm/styles";

import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import FormGroup from '../FormGroup/'

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const {setError, removeError, getErrorMessageByFieldName, errors} = useErrors()

  const isFormValid = (name && errors.length === 0)

  useImperativeHandle(ref, () => {
    return {
      setFieldsValues: (contact) => {
        setName(contact.name ?? '')
        setEmail(contact.email ?? '')
        setPhone(formatPhone(contact.phone) ?? '')
        setCategoryId(contact.category_id ?? '')
      },

      resetFields: () => {
        setName('')
        setEmail('')
        setPhone('')
        setCategoryId('')
      }
    }
  }, [])

  useEffect(() => {
    async function loadCategories() {
      try {


        const categoriesList = await CategoriesService.listCategories()

        setCategories(categoriesList)
      } catch {} finally {
        setIsLoadingCategories(false)
      }
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

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmitting(true)

    await onSubmit({ name, email, phone, categoryId})

    setIsSubmitting(false);
  }


  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          disabled = {isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled = {isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled = {isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button disabled={!isFormValid} isLoading={isSubmitting}
        type="submit">
          {!isSubmitting && buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
})

export default ContactForm
