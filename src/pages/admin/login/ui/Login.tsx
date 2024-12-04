import styles from './Login.module.scss'
import eye from '../../../../assets/images/eye-off-outline.svg'
import eyeon from '../../../../assets/images/eye-outline.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRequestAdminCodeMutation } from '@/entities/auth'

export const AdminLogin = () => {
  const [stage, setStage] = useState<number>(1)
  const [inputType, setInputType] = useState<boolean>(false)
  const [requestAdminCode, { error }] = useRequestAdminCodeMutation()

  const setSt = (e: any, num: number) => {
    if (num === 2) {
      setStage(2)
      setInputType(false)
      const formData = new FormData(e.target)
      const value = Object.fromEntries(formData) as Record<string, string>
      console.log(value)
    }
  }

  const handleRequestCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const value = Object.fromEntries(formData) as Record<string, string>
    const { email, password } = value

    try {
      await requestAdminCode({ email, password }).unwrap()
      setStage(3)
    } catch (err) {
      console.error('Ошибка при отправке кода:', error)
      alert('Произошла ошибка. Попробуйте снова.')
    }
  }

  function moveToNext(elem: any, index: any, inputs: any) {
    if (elem.length === 1) {
      if (index < inputs.length) {
        inputs[index].focus()
      } else {
        checkCode(inputs)
      }
    }
  }

  function checkBackspace(ek: any, index: any, inputs: any) {
    if (ek === 'Backspace') {
      if (index > 0) {
        inputs[index - 1].focus()
      }
    }
  }

  function checkCode(inps: any) {
    let code = ''
    inps.forEach((inp: any) => {
      code += inp.value
    })
    if (code.length === 5) {
      inps.forEach((inp: any) => {
        inp.blur()
      })
    }
  }

  return (
    <div className={styles.adminLogin}>
      {stage === 1 && (
        <form onSubmit={e => setSt(e, 2)}>
          <h1>Вход</h1>
          <input type="text" name="login" placeholder="Логин" />
          <section>
            <input type={!inputType ? 'password' : 'text'} name="password" placeholder="Пароль" />
            <button onClick={() => setInputType(!inputType)} type="button">
              <img src={!inputType ? eye : eyeon} alt="" />
            </button>
          </section>
          <input placeholder="Продолжить" type="submit" />
          <Link to="/admin/recover">Восстановить доступ</Link>
        </form>
      )}
      {stage === 2 && (
        <form onSubmit={handleRequestCodeSubmit}>
          <h1>Введите код подтверждения</h1>
          <section>
            <input
              className="code-inp"
              maxLength={1}
              style={{ width: '60px' }}
              onChange={e => moveToNext(e.target.value, 1, document.querySelectorAll('.code-inp'))}
              onKeyDown={e => {
                checkBackspace(e.key, this, document.querySelectorAll('.code-inp'))
              }}
              type="text"
              pattern="[0-9]"
              placeholder="0"
            />
            <input
              className="code-inp"
              maxLength={1}
              style={{ width: '60px' }}
              onChange={e => moveToNext(e.target.value, 2, document.querySelectorAll('.code-inp'))}
              onKeyDown={e => {
                checkBackspace(e.key, this, document.querySelectorAll('.code-inp'))
              }}
              type="text"
              pattern="[0-9]"
              placeholder="0"
            />
            <input
              className="code-inp"
              maxLength={1}
              style={{ width: '60px' }}
              onChange={e => moveToNext(e.target.value, 3, document.querySelectorAll('.code-inp'))}
              onKeyDown={e => {
                checkBackspace(e.key, this, document.querySelectorAll('.code-inp'))
              }}
              type="text"
              pattern="[0-9]"
              placeholder="0"
            />
            <input
              className="code-inp"
              maxLength={1}
              style={{ width: '60px' }}
              onChange={e => moveToNext(e.target.value, 4, document.querySelectorAll('.code-inp'))}
              onKeyDown={e => {
                checkBackspace(e.key, this, document.querySelectorAll('.code-inp'))
              }}
              type="text"
              pattern="[0-9]"
              placeholder="0"
            />
            <input
              className="code-inp"
              maxLength={1}
              style={{ width: '60px' }}
              onChange={e => moveToNext(e.target.value, 5, document.querySelectorAll('.code-inp'))}
              onKeyDown={e => {
                checkBackspace(e.key, this, document.querySelectorAll('.code-inp'))
              }}
              type="text"
              pattern="[0-9]"
              placeholder="0"
            />
          </section>
          <input placeholder="Продолжить" type="submit" />
        </form>
      )}
    </div>
  )
}