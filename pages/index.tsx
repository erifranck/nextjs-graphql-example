import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LAUNCHES, LaunchResponse } from '../queries/space'
import {useQuery} from '@apollo/client'
import { Grid, GridItem, Spinner, useBreakpointValue } from '@chakra-ui/react'
import { Card } from '../components/Card'

const Home: NextPage = () => {
  const variantColumnTemplate = useBreakpointValue({base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" })
  const {loading, error, data} = useQuery<LaunchResponse>(LAUNCHES)
  if (loading) return (
    <Spinner
      thickness="5px"
      speed="0.5s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  )
  if (error) return <div> { JSON.stringify(error) } </div>
  return (
    <Grid templateColumns={variantColumnTemplate} columnGap="20px" rowGap="30px" >
      {
        data && data.launchesPast.map(mission => {
          const { rocket, mission_name, links, details } = mission
          const {mission_patch_small, flickr_images} = links
          const imageUrl = flickr_images.length ? flickr_images[0] : mission_patch_small
          return (
            <GridItem key={mission.id}>
              <Card
                missionName={mission_name}
                missionDetails={details}
                rocketName={rocket.rocket_name}
                imageUrl={imageUrl}
              />
            </GridItem>
          )
        }
        )
      }
    </Grid>
  )
}

export default Home
