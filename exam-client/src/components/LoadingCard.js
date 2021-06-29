import React from 'react'
import { Placeholder, Card } from 'semantic-ui-react';

const getLoadingCard = (props) => {
    return (
        <Card raised={props.raised || true} fluid={props.fluid || true} className={props.className}>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            </Card.Content>
            <Card.Content>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                </Placeholder>
            </Card.Content>
        </Card>
    );
}

function LoadingCard(props) {
    return getLoadingCard(props);
}

export default LoadingCard
