import PageHeader from "../../components/PageHeader";

import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";

export default function NewContact() {
  async function handleSubmit(formData) {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId
    }

    const response = await ContactsService.createContact(contact)

    console.log(response)
  }

  return (
    <>
      <PageHeader
        title="Novo contato"
      />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}

      />
    </>
  )
}
