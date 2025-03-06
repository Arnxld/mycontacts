import PageHeader from "../../components/PageHeader";

import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import ContactForm from "../../components/ContactForm";

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo contato"
      />

      <ContactForm buttonLabel="Cadastrar"/>
    </>
  )
}
