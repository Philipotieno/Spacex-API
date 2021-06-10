import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import Error from './../../components/Error';
import Loader from './../../components/Loader';
import LaunchesFeed from './../../components/LaunchesFeed';

const GET_PAST_LAUNCHES = gql`
    {
        launchesPast(limit: 15) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            links {
                article_link
                flickr_images
            }
            id
        }
    }
`;

const PastLaunches = () => {
    const { data, loading, error } = useQuery(GET_PAST_LAUNCHES);

    if (loading) return <Loader />;
    if (error) return <Error error={error} />;

    const launches = data.launchesPast.filter(
        launch => launch.links.article_link && launch.links.flickr_images.length > 0
    );

    return (
        <Fragment>
            <h1 className="display-4 text-center my-5 pt-5">Past Lauches</h1>
            <LaunchesFeed launches={launches} />
        </Fragment>
    );
};

export default PastLaunches;
