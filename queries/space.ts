import { gql } from "@apollo/client";

export interface Launch {
    id: string;
    mission_name: string;
    launch_date_local: string;
    links: {
        flickr_images: string[];
        video_link: string;
        mission_patch: string;
        mission_patch_small: string;
    }
}

export interface LaunchResponse {
    launchesPast: Launch[]
}

export const LAUNCHES = gql`
    {
        launchesPast(limit: 30) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            links {
                article_link
                video_link
                flickr_images
                mission_patch_small
                mission_patch
            }
            id
        }
    }
`