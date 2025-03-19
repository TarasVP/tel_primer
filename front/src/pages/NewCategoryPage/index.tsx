import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { useFormik } from 'formik'

export const NewCategoryPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      id: '',
      description: '',
      text: '',
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.name) {
        errors.name = 'Name is required'
      }
      if (!values.id) {
        errors.id = 'Id is required'
      } else if (!values.id.match(/^[0-9]+$/)) {
        errors.id = 'Id may contain only numbers'
      }
      if (!values.description) {
        errors.description = 'Description is required'
      }
      if (!values.text) {
        errors.text = 'Text is required'
      } else if (values.text.length < 10) {
        errors.text = 'Text should be at least 10 characters long'
      }
      return errors
    },
    onSubmit: (values) => {
      console.info('Submitted', values)
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="id" label="Id" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
