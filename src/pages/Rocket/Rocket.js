import React from 'react';

import { gql, useQuery } from '@apollo/client';

// style
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import Rocket from './../../components/Rocket';
const GET_ROCKET_INFO = gql`
    query GET_ROCKET_INFO($rocketId: ID!) {
        rocket(id: $rocketId) {
            diameter {
                feet
                meters
            }
            height {
                feet
                meters
            }
            name
            stages
            engines {
                number
                propellant_1
                propellant_2
                type
                thrust_to_weight
            }
        }
    }
`;

const RocketPage = ({ match }) => {
    const rocketId = match.params.id;
    const { data, loading, error } = useQuery(GET_ROCKET_INFO, { variables: { rocketId } });

    if (loading) return <Loader />;
    if (error) return <Error error={error} />;

    console.log(data.rocket.name);
    return <Rocket rocket={{...data.rocket, id: rocketId}} />;
};

export default RocketPage;
