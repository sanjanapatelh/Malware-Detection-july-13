import React, { Component } from 'react';
import { Card, Button, Header,Icon,Segment} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    //const campaigns = await factory.methods.getDeployedMalwares().call();
    const testingNodes = await factory.methods.getDeployedNodes().call();

    return {
         testingNodes
     };
  }

  renderTestingNodes() {
    const items = this.props.testingNodes.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/test/${address}`}>
            <a>View Node</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>


          <Segment.Group>

          <Segment>
          <Header as='h3'>
              <Icon name='users' />
             Testing Nodes
          </Header>
          </Segment>

                <Segment>

          <Link route="/campaigns/newTest">
            <a>
              <Button
                floated="right"
                content="Add Testing Node"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderTestingNodes()}

          </Segment>
        </Segment.Group>
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
