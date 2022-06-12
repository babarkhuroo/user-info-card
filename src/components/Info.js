import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import '../styles/Info.css'
import Loading from './Loading'

const url = 'https://reqres.in/api/users'

function Info({ users, single_user, loading, single_loading, dispatch }) {
  const fetchUsers = async () => {
    dispatch({ type: 'SET_LOADING' })
    const res = await fetch(url)
    const data = await res.json()
    const { total_pages } = data

    for (let i = 1; i <= total_pages; i++) {
      const res = await fetch(`https://reqres.in/api/users?page=${i}`)
      const data = await res.json()
      dispatch({ type: 'SET_USERS', payload: data.data })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleClick = async (id) => {
    dispatch({ type: 'SET_SINGLE_LOADING' })
    const res = await fetch(url + '/' + id)
    const data = await res.json()
    dispatch({ type: 'SET_SINGLE_USER', payload: data.data })
  }

  if (loading) {
    return (
      <main className='main-container'>
        <Loading />
      </main>
    )
  }

  return (
    <main className='main-container'>
      {single_user.length === 0 ? (
        <section className='info'>
          <h2 className='message'>Please click on a button below</h2>
        </section>
      ) : single_loading ? (
        <section className='info'>
          <Loading />
        </section>
      ) : (
        <section className='info'>
          <h2>
            {single_user.first_name} {single_user.last_name}
          </h2>
          <img src={single_user.avatar} alt={single_user.first_name} />
          <p>E-mail : {single_user.email}</p>
        </section>
      )}

      <div className='btn-container'>
        {users.map((user) => {
          const { id, first_name } = user
          return (
            <button key={id} className='btn' onClick={() => handleClick(id)}>
              {first_name}
            </button>
          )
        })}
      </div>
    </main>
  )
}

const mapStateToProps = (store) => {
  const { users, single_user, loading, single_loading } = store
  return { users, single_user, loading, single_loading }
}

export default connect(mapStateToProps)(Info)
