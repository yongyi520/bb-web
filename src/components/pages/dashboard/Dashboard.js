import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks';

import { HELLO_QUERY } from '../../../gql/queries/helloQuery'

const Dashboard = () => {
  const {loading, error, data} = useQuery(HELLO_QUERY)
  if(loading) return <p>loading...</p>
  if(error) return <p>Error :(</p>
  console.log('data', data)
  return (
  <div>Dashboard</div>
  )
}

Dashboard.propTypes = {

}

export default Dashboard