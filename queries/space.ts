import { gql } from "@apollo/client";

export interface Launch {
    id: string;
    mission_name: string;
    launch_date_local: string;
}

export interface LaunchResponse {
    launchesPast: Launch[]
}

export const LAUNCHES = gql`
    {
        launchesPast(limit: 10) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            links {
                article_link
                video_link
            }
            id
        }
    }
`