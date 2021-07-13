import React, { Component } from 'react';
import { Card, Button, Header,Icon,Segment} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    //const campaigns = await factory.methods.getDeployedMalwares().call();
    const testingNodes = await factory.methods.getMyNode().call();

    return {
         testingNodes
     };
  }

  renderTestingNodes() {
      const {
        testingNodes


      } = this.props;

      const items = [

      {
        header: testingNodes,
        meta: 'Probabilty Malware',
        description:
          '',
        style: { overflowWrap: 'break-word' },
        color : 'blue'
      }

      ];

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
