import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LAUNCHES, LaunchResponse } from '../queries/space'
import {useQuery} from '@apollo/client'
import { Grid, GridItem } from '@chakra-ui/react'

const Home: NextPage = () => {
  const {loading, error, data} = useQuery<LaunchResponse>(LAUNCHES)
  if (loading) return <div> loading... </div>
  if (error) return <div> { JSON.stringify(error) } </div>
  return (
    <Grid templateColumns="repeat(6, 1fr)" gab={6}>
      {
        data && data.launchesPast.map(mission => (
          <GridItem key={mission.id}>
            { mission.links.flickr_images.length && <img src={mission.links.flickr_images[0]} /> }
            <div>{mission.mission_name}</div>
          </GridItem>
        ))
      }
    </Grid>
  )
}

export default Home
