import { useState, useEffect } from 'react'
import { validateRegisterForm } from '../../services/formAuthValidation'
import { toast } from 'react-toastify'
import { Button, Input } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'

function RegisterForm () {
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null
  })

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const { register } = useAuth()

  const navigate = useNavigate()

  const { state: { user, jwt } } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (_errors) {
      setErrors(_errors)
    } else {
      toast.info(`Formulaire soumis : ${formData.username} ${formData.email}`)
    }
    register(formData)
  }

  console.log(formData)

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <h1>Inscription</h1>
      <Input
        name='username'
        label="Nom d'utilisateur"
        placeholder="Votre nom d'utilisateur..."
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        label='Email : '
        placeholder='Votre mail'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe : '
        type='password'
        placeholder='Votre mot de passe'
        value={formData.password}
        onChange={handleChange}
      />
      <Button
        type='submit'
        color='primary'
      >
        S'enregistrer
      </Button>
    </form>
  )
}

export default RegisterForm
