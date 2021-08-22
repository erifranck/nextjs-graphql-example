import type { NextPage } from 'next'
import { LAUNCHES, LaunchResponse } from '../queries/space'
import {useLazyQuery} from '@apollo/client'
import { Grid, GridItem, Spinner, useBreakpointValue, Center } from '@chakra-ui/react'
import { Card } from '../components/Card'
import { useEffect, useState, useCallback } from 'react'
import { SearchBar } from '../components/SearchBar'

const Home: NextPage = () => {
  const [searchState, setSearch] = useState('')
  const variantColumnTemplate = useBreakpointValue({base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" })
  const [ excecuteSearch, {loading, error, data} ] = useLazyQuery<LaunchResponse>(LAUNCHES)
  useEffect(() => {
    excecuteSearch(
      {
        variables: { find: { mission_name: searchState || 'starlink' } }
      }
    )
  }, [searchState])
  const onChange = useCallback((value: string) => {
    setSearch(value)
    excecuteSearch(
      {
        variables: { find: { mission_name: value } }
      }
    )
  }, [excecuteSearch, setSearch])

  return (
    <>
      <SearchBar onChange={onChange} search={searchState} />
      { error && ( <div> { JSON.stringify(error) } </div> ) }
      {
        loading && (
          <Center>
            <Spinner
              thickness="5px"
              speed="0.5s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )
      }
      <Grid templateColumns={variantColumnTemplate} columnGap="20px" rowGap="30px" mt="20px" >
        {
          data && data.launchesPast.map(mission => {
            const { rocket, mission_name, links, details } = mission
            const {mission_patch_small, flickr_images, article_link, video_link} = links
            const imageUrl = flickr_images.length ? flickr_images[0] : mission_patch_small
            return (
              <GridItem key={mission.id}>
                <Card
                  missionName={mission_name}
                  missionDetails={details}
                  rocketName={rocket.rocket_name}
                  imageUrl={imageUrl}
                  onClick={
                    () => {
                      if (article_link || video_link) {
                        window.open(article_link || video_link)
                      }
                    }
                  }
                />
              </GridItem>
            )
          }
          )
        }
      </Grid>
    </>
  )
}

export default Home
