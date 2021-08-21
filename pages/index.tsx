import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LAUNCHES, LaunchResponse } from '../queries/space'
import {useQuery} from '@apollo/client'

const Home: NextPage = () => {
  const {loading, error, data} = useQuery<LaunchResponse>(LAUNCHES)
  if (loading) return <div> loading... </div>
  if (error) return <div> { JSON.stringify(error) } </div>
  return (
    <div>
      {
        data && data.launchesPast.map(mission => (
          <div key={mission.id}>
            <div>{mission.mission_name}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Home
