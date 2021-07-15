import React, { Component } from 'react';
import { Card, Button ,Header,Icon,Segment} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import AnalyseForm from '../components/AnalyseForm';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedMalwares().call();

    return {
         campaigns
     };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Malware</a>
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
                    <Icon name='file alternate outline' />
                    Analysing Files
                </Header>
                            <AnalyseForm />
                        </Segment>

        <Segment>
        <Header as='h3'>
            <Icon name='bug' />
           Malware Files
        </Header>
        </Segment>

              <Segment>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Malware"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}

          </Segment>
        </Segment.Group>


       </div>

      </Layout>
    );
  }
}

export default CampaignIndex;
